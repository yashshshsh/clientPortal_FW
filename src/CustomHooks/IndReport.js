import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Config'; 

export function useFetchReportId(url, dependencies = []) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getApiData(url);
    }, [url, ...dependencies]);

    const getApiData = async (url) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(fullUrl + url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // console.log("response.data",response.data);
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, setData, isLoading, error };
}

export function useFetchSection(url, dependencies = []) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getApiData(url);
    }, [url, ...dependencies]);

    const getApiData = async (url) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(fullUrl + url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // console.log("response.data",response.data);
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, setData, isLoading, error };
}

export function useFetchReportSection(url, dependencies = []) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getApiData(url);
    }, [url, ...dependencies]);

    const getApiData = async (url) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(fullUrl + url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // console.log("response.data",response.data);
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, setData, isLoading, error };
}

export function useFetchImpFactor(url, dependencies = []) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getApiData(url);
    }, [url, ...dependencies]);

    const getApiData = async (url) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(fullUrl + url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // console.log("response.data",response.data);
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, setData, isLoading, error };
}

export function useFetchReportAdmin(url, dependencies = []) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getApiData(url);
    }, [url, ...dependencies]);

    const getApiData = async (url) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(fullUrl + url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // console.log("response.data",response.data);
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, setData, isLoading, error };
}

export function useFetchReportAction(url, dependencies = []) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getApiData(url);
    }, [url, ...dependencies]);

    const getApiData = async (url) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(fullUrl + url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // console.log("response.data",response.data);
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, setData, isLoading, error };
}

export function useFetchRepAttachemnts(url, dependencies = []) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getApiData(url);
    }, [url, ...dependencies]);

    const getApiData = async (url) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(fullUrl + url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // console.log("response.data",response.data);
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, setData, isLoading, error };
}

export function useFetchRepAns(url, dependencies = []) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getApiData(url);
    }, [url, ...dependencies]);

    const getApiData = async (url) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(fullUrl + url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            // console.log("response.data",response.data);
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, setData, isLoading, error };
}

export function useFetchRepAttachmentsID() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const getApiData = async (url, sectionId) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.get(fullUrl + url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            setData((prevData) => ({
                ...prevData,
                [sectionId]: response.data,
            }));
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, setData, isLoading, error, getApiData };
}

export function useCreateAction(dependencies = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     if (formData) {
    //         postData(url, formData);
    //     }
    // }, [url, formData, ...dependencies]);

    const postData = async (url, formData) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}client/`;
            const token = localStorage.getItem("authToken");

            const response = await axios.post(fullUrl + url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error('An error occurred while posting the data:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error,postData };
}


