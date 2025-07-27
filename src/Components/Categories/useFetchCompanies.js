import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../Redux/Slices/companiesSlice";

export default function useFetchCompanies() {
  const dispatch = useDispatch();
  const { companies, loading, error } = useSelector((state) => state.companies);

  useEffect(() => {
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch]);

  return { companies, loading, error };
}
