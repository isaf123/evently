// File: src/utils/iconUtils.tsx
import * as React from 'react';
import { Calendar, ScanLine, UserRound } from 'lucide-react';

export const renderIcon = (icon: string) => {
    switch (icon) {
        case 'events':
            return <Calendar size={20} />
        case 'transaction':
            return <ScanLine size={20} />
        case 'customers':
            return <UserRound size={20} />
        default:
            return null; // Jika jenis ikon tidak cocok, tidak menampilkan ikon
    }
};
