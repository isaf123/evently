export const generateEventCode = (id: number): string => {
    const paddedId = id.toString().padStart(3, '0'); // Padding ID dengan nol di depan jika kurang dari 3 digit
    return `EVN${paddedId}`; // Menghasilkan EventCode dengan format EVNXXX
};