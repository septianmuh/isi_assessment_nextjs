export function FileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => {
            if (event.target && event.target.result) {
                const base64String = event.target.result as string;
                resolve(base64String.split(',')[1]);
            } else {
                reject('Gagal membaca file.');
            }
        };

        reader.readAsDataURL(file);
    });
}

export function FormatDateYYYYMMDDD (date: Date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
}