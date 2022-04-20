import { file } from '../lib/file.js';
import { utils } from '../lib/utils.js';

const isValidString = (text, maxSize) => {
    if (typeof text !== 'string'
        || text === ''
        || text.length > maxSize) {
        return false;
    }
    return true;
}

const isValidService = (service) => {
    const servicesKeysCount = 3;
    const maxIconLength = 20;
    const maxTitleLength = 30;
    const maxDescLength = 200;
    if (typeof service !== 'object'
        || Array.isArray(service)
        || service === null
        || Object.keys(service).length > servicesKeysCount
        || Object.keys(service).length < servicesKeysCount
        || !isValidString(service.icon, maxIconLength)
        || !isValidString(service.title, maxTitleLength)
        || !isValidString(service.description, maxDescLength)) {
        return false;
    }
    return true;
}

async function servicesSection() {
    const getServicesData = async () => {
        const data = [];
        const [err, servicesFiles] = await file.list('services');
        if (err) {
            return data;
        }

        for (const serviceFileName of servicesFiles) {
            const [err, content] = await file.read('services', serviceFileName);
            if (err) {
                continue;
            }

            let obj = utils.parseJSONtoObject(content);
            if (!obj) {
                continue;
            }

            data.push(obj);
        }

        return data;
    }

    const renderList = async () => {
        const servicesData = await getServicesData();
        if (!Array.isArray(servicesData) ||
            servicesData.length === 0) {
            return '';
        }

        let HTML = '';
        for (const service of servicesData) {
            if (!isValidService(service)) {
                continue;
            }
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
                <div class="row services-list">${await renderList()}</div>
            </section>`;
}

export { servicesSection, isValidService };