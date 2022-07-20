export const requestErrorHandler = (error: any) => {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Ups, something when wrong...');
    } else {
        throw new Error(error);
    }
}