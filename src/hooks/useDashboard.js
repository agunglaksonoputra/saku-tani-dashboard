import {useState, useEffect, useCallback} from "react";
import {reportService} from "@/services/reportService";

export const useDashboard = () => {
    const [report, setReport] = useState([]);
    const [reportMatrix, setReportMatrix] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReport = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const [currentResponse, monthlyResponse] = await Promise.all([reportService.getReportCurent(), reportService.getMonthlyReport()]);

            if (currentResponse.success) {
                setReport(currentResponse.data);
            } else {
                setError("Gagal memuat data report");
            }

            if (monthlyResponse.success) {
                setReportMatrix(monthlyResponse.data);
            } else {
                setError("Gagal memuat data report bulanan");
            }
        } catch (err) {
            setError(err.message || "Unknown error");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, []);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const refreshData = () => {
        fetchReport();
    };

    return {
        report,
        reportMatrix,
        loading,
        error,
        refreshData,
    };
};
