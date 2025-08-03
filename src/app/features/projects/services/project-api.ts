import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../projects';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    getProjects(): Observable<Project[]> {
        return of([
            {
                id: '1', // Added unique identifier
                title: "Katalog Makanan Online (Order via WhatsApp)",
                description: "Platform pemesanan makanan dengan desain responsif yang terintegrasi langsung ke WhatsApp untuk proses order yang lebih efisien.",
                images: [
                    "https://imageeweb.s3.us-east-1.amazonaws.com/jonathangea.dev/food%3Dorder-app.webp",
                    "https://imageeweb.s3.us-east-1.amazonaws.com/jonathangea.dev/food%3Dorder-app.webp",
                    "https://imageeweb.s3.us-east-1.amazonaws.com/jonathangea.dev/food%3Dorder-app.webp",
                ],
                tags: ['Angular', 'Tailwind CSS', 'WhatsApp API'],
                livePreviewUrl: "https://perfume-ecommerce-web-fe-public-production.up.railway.app/h",
                sourceCodeUrl: '#',
                caseStudyUrl: '#', // Added for consistency
                type: 'Aplikasi Web',
                domain: 'FnB',
                featured: true,
                year: 2023, // Added year
                currentIndex: 0 // Added for slider
            },
            {
                "id": "2",
                "title": "Portal Berita",
                "description": "Sebuah portal berita modern yang dirancang untuk pengalaman membaca yang optimal. Menyajikan informasi terkini secara cepat dan responsif di semua perangkat, lengkap dengan pilihan tema gelap dan terang untuk kenyamanan visual Anda.",
                "images": [
                    "https://imageeweb.s3.us-east-1.amazonaws.com/Screenshot_7.webp",
                    "https://imageeweb.s3.us-east-1.amazonaws.com/Screenshot_5.webp",
                    "https://imageeweb.s3.us-east-1.amazonaws.com/Screenshot_6.webp",
                ],
                "tags": ["Angular", "Tailwind CSS", "TypeScript", "RxJS"],
                "livePreviewUrl": "https://perfume-ecommerce.s3.us-east-1.amazonaws.com/index.html",
                "sourceCodeUrl": "#",
                "caseStudyUrl": "#",
                "type": "Aplikasi Web",
                "domain": "Media & Pemberitaan",
                "featured": true,
                "year": 2024,
                "currentIndex": 0
            },
            {
                id: '1', // Added unique identifier
                title: "Katalog Makanan Online (Order via WhatsApp)",
                description: "Platform pemesanan makanan dengan desain responsif yang terintegrasi langsung ke WhatsApp untuk proses order yang lebih efisien.",
                images: [
                    "https://imageeweb.s3.us-east-1.amazonaws.com/jonathangea.dev/food%3Dorder-app.webp",
                    "https://imageeweb.s3.us-east-1.amazonaws.com/jonathangea.dev/food%3Dorder-app.webp",
                    "https://imageeweb.s3.us-east-1.amazonaws.com/jonathangea.dev/food%3Dorder-app.webp",
                ],
                tags: ['Angular', 'Tailwind CSS', 'WhatsApp API'],
                "livePreviewUrl": "https://perfume-ecommerce-web-fe-public-production.up.railway.app/h",
                sourceCodeUrl: '#',
                caseStudyUrl: '#', // Added for consistency
                type: 'Aplikasi Web',
                domain: 'FnB',
                featured: true,
                year: 2023, // Added year
                currentIndex: 0 // Added for slider
            }
        ]);
    }

}