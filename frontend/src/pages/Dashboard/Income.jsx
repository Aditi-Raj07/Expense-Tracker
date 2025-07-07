import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/layouts/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/layouts/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
const Income = () => {
    useUserAuth();
    const [loading,setLoading]=useState(false);
    const [incomedata,setincomedata] =useState([]);
    const [OpenAddIncomeModal,setOpenAddIncomeModal]=useState(false);
    const [openDeleteAlert,setopenDeleteAlert]=useState({
        show:false,
        data:null,
    });

    //Get all the income Details
    const fetchIncomeDetails = async () => {
        if(loading) return;

        setLoading(true);
        try{
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

            if(response.data){
                setincomedata(response.data);
            }
        }catch(err){
            console.log("Server Error !!!")
        }finally{
            setLoading(false);
        }
    }

    // Handle add income
    const handleAddIncome= async (income)=>{
        const {amount,source,date,icon}=income;
        //validation check
        if(!source.trim()){
            toast.error("Source is required!");
            return;
        }
        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("Amount should be a valid number greater than 0!");
            return;
        }
        if(!date){
            toast.error("Date is required!");
            return;
        }
        try{
            const response = await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`,{
                icon,
                source,
                amount,
                date,
            });

            setOpenAddIncomeModal(false);
            toast.success("Income added succesfully!");
            fetchIncomeDetails();
        }catch(error){
            console.error("Error in Adding the income",error.response?.data?.message || error.message);
        }

    }
    

    //Delete income
    const DeleteIncome=async(id)=>{
        try{
            await axiosInstance.delete(`${API_PATHS.INCOME.DELETE_INCOME(id)}`);

            setopenDeleteAlert({show:false,data:null});
            toast.success("Income deleted successfully!");
            fetchIncomeDetails();

        }catch(error){
            console.error("Error in deleting the income",error?.response?.data?.message || error.message);
        }
         
    };

    // Handle income download
    const DownloadIncome=async()=>{
            try{
            const response = await axiosInstance.get(`${API_PATHS.INCOME.DOWNLOAD_INCOME}`,
                {
                    responseType:"blob",
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href=url;
            link.setAttribute("download","income_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch(error){
            console.error("Error downloading expense details:",error);
            toast.error("Failed to Download the details")
        }
    };

    useEffect(()=>{
        fetchIncomeDetails();
        return ()=>{};
    })
    return(
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <IncomeOverview
                            transactions={incomedata}
                            onAddIncome = {()=>setOpenAddIncomeModal(true)}
                        />

                    </div>
                    <IncomeList 
                        transactions={incomedata}
                        onDelete={(id)=>{
                            setopenDeleteAlert({show:true,data:id});
                        }}
                        onDownload={DownloadIncome}
                    />
                </div>
                <Modal 
                    isOpen={OpenAddIncomeModal}
                    onClose={()=> setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome}/>
                </Modal>

                <Modal 
                isOpen={openDeleteAlert.show}
                onClose={()=>setopenDeleteAlert({show:false, data:null})}
                title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income ?"
                        onDelete={()=>DeleteIncome(openDeleteAlert.data)}
                    />
                </Modal>
            </div>

        </DashboardLayout>
    )
}

export default Income;