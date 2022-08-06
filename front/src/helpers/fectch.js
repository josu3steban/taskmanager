
const baseUrl = import.meta.env.VITE_API_URL

export const fectchWithoutToken = async( endpoint, data, method='GET' ) => {
    const url = `${baseUrl}/${endpoint}`;

    if( method === 'GET' ) {
        return await fetch( url );
    }else {
        return await fetch( url, {
            method,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify( data )
        });
    }
};

export const fectchWithToken = async( endpoint, data, method='GET' ) => {
    const url = `${baseUrl}/${endpoint}`;

    if( method === 'GET' ) {
        return await fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token') ?? ''
            }
        });
    }else {
        return await fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token') ?? ''
            },
            body: JSON.stringify( data )
        });
    }
};
