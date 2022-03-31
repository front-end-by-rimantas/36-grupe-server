async function servicesSection() {
    const getServicesData = () => {
        return [
            {
                icon: 'globe',
                title: 'Dizainas',
                description: 'Each time a digital asset is purchased or sold, Sequoir donates a percentage of the fees back into the development of the asset through its charitable foundation.',
            },
            {
                icon: 'plane',
                title: 'Lakunas',
                description: 'Time a digital asset donates a percentage of the fees back into the development of the asset through its charitable foundation.',
            },
            {
                icon: 'car',
                title: 'Taksistas',
                description: 'Digital asset is purchased or sold, Sequoir donates a the development of the asset through its charitable foundation.',
            },
        ];
    }

    const renderList = () => {
        const servicesData = getServicesData();

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