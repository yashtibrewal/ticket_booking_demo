
if(!process.env.API_URL){
    throw new Error('Environment Not Set');
}

export const backendUrl = process.env.API_URL;