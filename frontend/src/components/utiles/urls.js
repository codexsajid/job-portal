

// export const USER_END_POINT_URL = "http://localhost:8000/api/user";
// export const JOB_END_POINT_URL = "http://localhost:8000/api/job";
// export const APPLICANT_END_POINT_URL = "http://localhost:8000/api/application";
// export const COMPANY_END_POINT_URL = "http://localhost:8000/api/company";
// https://job-portal-zikz.onrender.com
// import.meta.env.VITE_API_URL || 

const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";

export const USER_END_POINT_URL = `${BASE_URL}/api/user`;
export const JOB_END_POINT_URL = `${BASE_URL}/api/job`;
export const APPLICANT_END_POINT_URL = `${BASE_URL}/api/application`;
export const COMPANY_END_POINT_URL = `${BASE_URL}/api/company`;
