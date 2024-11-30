import axios from 'axios';
import { base_url } from '../Config'; 

export function loginHook(url, dependencies = []) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getApiData(url);
    }, [url, ...dependencies]);

    const getApiData = async (url) => {
        setIsLoading(true);
        try {
            const fullUrl = `${base_url.protocol}://${base_url.hostname}:${base_url.port}${base_url.api_base_path}${url}`;
            const response = await axios.post(fullUrl + url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("response.data",response.data);
            // setData(response.data);
        } catch (error) {
            console.error('An error occurred while fetching the API:', error);
            setError(error.response?.statusText || error.message);
        } finally {
            setIsLoading(false);
        }
    };
}