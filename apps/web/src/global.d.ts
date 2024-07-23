interface Snap {
  pay: (
    requestData: any,
    options: {
      onSuccess: (result: any) => void;
      onClose?: (result: any) => void;
      onPending?: (result: any) => void;
      onError?: (result: any) => void;
      // Anda dapat menambahkan callback lain seperti onPending, onError, dll. jika diperlukan
    },
  ) => void;
}

interface Window {
  snap: Snap;
}
