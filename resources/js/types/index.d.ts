import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Patient {
    id: number;
    patient_id: string;
    nik: string;
    name: string;
    gender: string;
    birth_date: string;
    address: string;
    phone: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

export interface Examination {
    id: number;
    examination_id: string;
    patient_id: number;
    complaint: string;
    diagnosis: string;
    treatment: string;
    doctor: string;
    examination_date: string;
    created_at: string;
    updated_at: string;
    patient?: Patient;
    prescriptions?: MedicinePrescription[];
}

export interface Referral {
    id: number;
    referral_id: string;
    patient_id: number;
    diagnosis: string;
    referred_to: string;
    reason: string;
    status: 'pending' | 'completed';
    doctor: string;
    referral_date: string;
    created_at: string;
    updated_at: string;
    patient?: Patient;
}

export interface Medicine {
    id: number;
    medicine_id: string;
    name: string;
    category: string;
    unit: string;
    stock: number;
    expiry_date: string;
    supplier: string;
    created_at: string;
    updated_at: string;
}

export interface MedicinePrescription {
    id: number;
    examination_id: number;
    medicine_id: number;
    dosage: string;
    quantity: number;
    instructions: string;
    created_at: string;
    updated_at: string;
    medicine?: Medicine;
}

export interface PaginatedData<T> {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}