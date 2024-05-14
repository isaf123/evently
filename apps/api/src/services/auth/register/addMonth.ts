export const addMonth = (date: Date, month: number): Date => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + month)
    return newDate
}