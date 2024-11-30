import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Config'; 

export function useFetchLaststores(url, dependencies = []) {
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

export function useFetchAudYearList(url, dependencies = []) {
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