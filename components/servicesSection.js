import { file } from '../lib/file.js';

async function servicesSection() {
    const getServicesData = async () => {
        const data = [];
        const [err, servicesFiles] = await file.list('services');
        if (err) {
            return data;
        }
        console.log(servicesFiles);

        // perskaityti kiekvieno to failo turini
        // turini sudeti i masyva
        return data;
    }

    const renderList = () => {
        const servicesData = getServicesData();
        if (!Array.isArray(servicesData) ||
            servicesData.length === 0) {
            return '';
        }

        let HTML = '';
        for (const service of servicesData) {
            HTML += `<div class="service">
                        <i class="fa fa-${service.icon} icon"></i>
                        <h3 class="title">${service.title}</h3>
                        <p class="description">${service.description}</p>
                    </div>`;
        }
        return HTML;
    }

    return `<section class="container bg-gradient services">
                <div class="row">
                    <h2>Services</h2>
                    <p>Each time a digital asset is purchased or sold, Sequoir donates a percentage of the fees back into the development of the asset through its charitable foundation.</p>
                </div>
                <div class="row services-list">${renderList()}</div>
            </section>`;
}

export { servicesSection };