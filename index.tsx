
document.addEventListener('DOMContentLoaded', () => {

    // --- MOCK DATA ---
    const loadsData = [
        { city: 'Ahmedabad', loads: 104, coords: { lat: 23.0225, lon: 72.5714 }, available: [
            { type: '32 Feet Single Axle', new: true, tonnage: 9, from: 'Ahmedabad', fromArea: 'Bavla', to: 'Bhiwandi', toArea: 'Mumbai', agent: 'Tanu Singh', rating: 5.0, languages: 'English, Hindi' },
            { type: '32 Feet Single Axle High Cube', new: false, tonnage: 11, from: 'Ahmedabad', to: 'Bhiwandi', agent: 'Amit Tiwari', rating: null, languages: 'Gujarati, Hindi' }
        ]},
        { city: 'Bangalore', loads: 967, coords: { lat: 12.9716, lon: 77.5946 }, available: [
             { type: '32 Feet Multi Axle', new: true, tonnage: 21, from: 'Bangalore', to: 'Chennai', agent: 'Ravi Kumar', rating: 4.8, languages: 'Kannada, English' }
        ] },
        { city: 'Chennai', loads: 742, coords: { lat: 13.0827, lon: 80.2707 }, available: [
            { type: '19 Feet', new: false, tonnage: 7, from: 'Chennai', to: 'Hyderabad', agent: 'Priya Sharma', rating: 4.9, languages: 'Tamil, English' }
        ] },
        { city: 'Hyderabad', loads: 1155, coords: { lat: 17.3850, lon: 78.4867 }, available: [] },
        { city: 'Kolkata', loads: 609, coords: { lat: 22.5726, lon: 88.3639 }, available: [] },
        { city: 'Mumbai', loads: 515, coords: { lat: 19.0760, lon: 72.8777 }, available: [
            { type: '32 Feet Single Axle', new: false, tonnage: 10, from: 'Mumbai', to: 'Pune', agent: 'Vikram Patel', rating: null, languages: 'Marathi, Hindi' },
            { type: '40 Feet', new: true, tonnage: 25, from: 'Mumbai', to: 'Delhi', agent: 'Sonia Gupta', rating: 5.0, languages: 'Hindi, English' }
        ] },
        { city: 'Pune', loads: 245, coords: { lat: 18.5204, lon: 73.8567 }, available: [] },
        { city: 'Surat', loads: 99, coords: { lat: 21.1702, lon: 72.8311 }, available: [] }
    ];

    const tripsData = {
        active: [
            { from: ['Tumkur', 'Hirehalli', 'Madhavaram'], id: '#5334467', date: '05-Aug', truck: 'TN52H4678' },
            { from: ['Sarjapura', 'Kanchipuram'], id: '#5206551', date: '24-Jul', truck: 'TN52H4678' },
            { from: ['Chennai', 'Bangalore'], id: '#5128549', date: '16-Jul', truck: 'TN52H4678' },
        ],
        pod: [
            { from: ['Hyderabad', 'Vijayawada'], id: '#4998213', date: '12-Jul', truck: 'KA01J1234', statusMessage: 'Awaiting POD Submission' }
        ],
        invoiced: [
            { from: ['Mumbai', 'Delhi'], id: '#4876543', date: '01-Jul', truck: 'TN52H4678', advance: '₹35,000 (70%)', balance: '₹15,000', statusMessage: 'Invoice Sent' }
        ],
        balance: [
            { from: ['Pune', 'Nagpur'], id: '#4712389', date: '15-Jun', truck: 'KA01J1234', advance: '₹28,000 (80%)', balance: '₹7,000', statusMessage: 'POD Verified, Balance Due' }
        ],
        paid: [
            { from: ['Coimbatore', 'Indore'], id: '#4653484', date: '03-Jun', truck: 'TN52H4678' },
            { from: ['Malur', 'Dabaspete'], id: '#2787882', date: '26-Sep', truck: 'TN52H4678' },
        ]
    };
    
    const trucksData = [
        { id: 'TN52H4678', status: 'In Transit', currentLocation: 'Near Krishnagiri', eta: '3 hours', from: 'Chennai', to: 'Bangalore', currentCoordIndex: 35, loadId: '#5128549', route: [ { lat: 13.0827, lon: 80.2707 }, { lat: 13.0, lon: 80.2 }, { lat: 12.9, lon: 80.1 }, { lat: 12.8, lon: 80.0 }, { lat: 12.7, lon: 79.8 }, { lat: 12.65, lon: 79.5 }, { lat: 12.6, lon: 79.2 }, { lat: 12.55, lon: 78.9 }, { lat: 12.5, lon: 78.5 }, { lat: 12.5, lon: 78.2187 }, { lat: 12.6, lon: 78.0 }, { lat: 12.7, lon: 77.8 }, { lat: 12.8, lon: 77.7 }, { lat: 12.9716, lon: 77.5946 } ].flatMap((p, i, a) => i < a.length - 1 ? Array.from({length: 10}, (_, j) => ({ lat: p.lat + (a[i+1].lat - p.lat) * j / 10, lon: p.lon + (a[i+1].lon - p.lon) * j / 10 })) : [p]) },
        { id: 'KA01J1234', status: 'Idle', currentLocation: 'Mumbai Yard', eta: '-', from: 'Mumbai', to: 'Pune', currentCoordIndex: 0, loadId: null, route: [ { lat: 19.0760, lon: 72.8777 }, { lat: 19.0, lon: 73.1 }, { lat: 18.9, lon: 73.3 }, { lat: 18.7, lon: 73.5 }, { lat: 18.5204, lon: 73.8567 } ].flatMap((p, i, a) => i < a.length - 1 ? Array.from({length: 10}, (_, j) => ({ lat: p.lat + (a[i+1].lat - p.lat) * j / 10, lon: p.lon + (a[i+1].lon - p.lon) * j / 10 })) : [p]) }
    ];

    const reportsData = [
        { id: '#4876543', from: 'Mumbai', to: 'Delhi', truck: 'TN52H4678', date: '01-Jul', status: 'Paid', amount: '50,000' },
        { id: '#4712389', from: 'Pune', to: 'Nagpur', truck: 'KA01J1234', date: '15-Jun', status: 'Paid', amount: '35,000' },
        { id: '#4653484', from: 'Coimbatore', to: 'Indore', truck: 'TN52H4678', date: '03-Jun', status: 'Paid', amount: '62,000' },
        { id: '#2787882', from: 'Malur', to: 'Dabaspete', truck: 'TN52H4678', date: '26-May', status: 'Paid', amount: '18,500' }
    ];
    
    const supportTicketsData = [
        { id: 'ST-83642', subject: 'Payment Issue for Load #4876543', status: 'Open', lastUpdate: '1h ago', conversation: [
            { sender: 'user', message: 'Hi, my payment for load #4876543 has not reflected yet.', timestamp: '10:30 AM' },
            { sender: 'support', message: 'Hello, thank you for reaching out. Let me check the transaction details for you. Please allow me a moment.', timestamp: '10:32 AM' }
        ]},
        { id: 'ST-83598', subject: 'Incorrect POD Uploaded', status: 'Resolved', lastUpdate: '2d ago', conversation: [
            { sender: 'user', message: 'I uploaded the wrong POD for trip #4998213.', timestamp: 'Yesterday, 2:15 PM' },
            { sender: 'support', message: 'We have reset the POD upload status for you. You can now upload the correct document.', timestamp: 'Yesterday, 2:20 PM' },
            { sender: 'user', message: 'Thank you!', timestamp: 'Yesterday, 2:21 PM' },
        ]}
    ];


    // --- DOM ELEMENTS ---
    const splashScreen = document.getElementById('splash-screen');
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    const appHeader = document.getElementById('app-header');
    const navButtons = document.querySelectorAll('.nav-button');
    const screens = document.querySelectorAll('.screen');
    const loadsList = document.getElementById('loads-list');
    const loadsMapContainer = document.getElementById('loads-map-container');
    const viewToggleListBtn = document.getElementById('view-toggle-list');
    const viewToggleMapBtn = document.getElementById('view-toggle-map');
    const searchBar = document.getElementById('search-bar') as HTMLInputElement;
    const filterButtonsContainer = document.querySelector('.filters');
    const clearAllFiltersBtn = document.getElementById('clear-all-filters-btn');
    const tripsList = document.getElementById('trips-list');
    const tripsTabs = document.querySelectorAll('.tab-button');
    const trucksSelectionList = document.getElementById('trucks-selection-list');
    const trucksMapContainer = document.getElementById('trucks-map-container');
    const truckDetailsPanel = document.getElementById('truck-details-panel');
    const profileMenu = document.querySelector('.profile-menu');
    const backToProfileBtn = document.getElementById('back-to-profile-btn');
    const bankDetailsContent = document.getElementById('bank-details-content');
    const backToProfileFromUserBtn = document.getElementById('back-to-profile-from-user-btn');
    const userDetailsContent = document.getElementById('user-details-content');
    const backToProfileFromReportsBtn = document.getElementById('back-to-profile-from-reports-btn');
    const reportsContent = document.getElementById('reports-content');

    // Auth screen elements
    const authScreens = document.querySelectorAll('.auth-screen');
    const gotoLoginBtn = document.getElementById('goto-login-btn');
    const gotoSignupBtn = document.getElementById('goto-signup-btn');
    const loginForm = document.getElementById('login-form');
    const signupForms = {
        '1': document.getElementById('signup-form-1'),
        '2': document.getElementById('signup-form-2'),
        '3': document.getElementById('signup-form-3')
    };
    const signupSteps = {
        '1': document.getElementById('signup-step-1'),
        '2': document.getElementById('signup-step-2'),
        '3': document.getElementById('signup-step-3')
    };
    const uploadInputs = document.querySelectorAll('.upload-input');

    // Support screen elements
    const supportTicketsList = document.getElementById('support-tickets-list');
    const raiseTicketFab = document.getElementById('raise-ticket-fab');
    const backToSupportBtn = document.getElementById('back-to-support-btn');
    const ticketChatSubject = document.getElementById('ticket-chat-subject');
    const ticketChatId = document.getElementById('ticket-chat-id');
    const ticketChatMessages = document.getElementById('ticket-chat-messages');
    const ticketChatForm = document.getElementById('ticket-chat-form');
    const chatMessageInput = document.getElementById('chat-message-input') as HTMLInputElement;
    const backToSupportFromNewBtn = document.getElementById('back-to-support-from-new-btn');
    const newTicketForm = document.getElementById('new-ticket-form');
    
    // Modal elements
    const filterModal = document.getElementById('filter-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalClearBtn = document.getElementById('modal-clear-btn');
    const modalApplyBtn = document.getElementById('modal-apply-btn');


    // --- STATE ---
    let currentScreen = 'loads';
    let currentLoadsView = 'list';
    let currentFilterType = '';
    let selectedTruckId = null;
    let truckAnimationInterval = null;
    let currentTicketId = null;
    let activeFilters = {
        truckTypes: [],
        languages: [],
        minTonnage: null,
        maxTonnage: null,
    };
    let primaryBankAccount = {
        bankName: 'HDFC Bank',
        accountHolder: 'Sivakumar S',
        accountNumber: '50100123456789',
        ifsc: 'HDFC0001234'
    };
    let userDetails = {
        name: 'Sivakumar S',
        pin: '9434',
        alternateMobile: '+91 9876543210',
        pan: 'ABCDE1234F',
        aadhaar: '123456789012',
        vehicle: {
            truckNumber: 'TN52H4678',
        }
    };
    
    // --- HEADERS ---
    const headers = {
        loads: `Search`,
        trips: `Trips`,
        trucks: `Trucks`,
        support: `Support`,
        profile: ``, // Profile has its own header
    };

    // --- DATA for Filters ---
    const allTruckTypes = [...new Set(loadsData.flatMap(c => c.available.map(l => l.type)))];
    const allLanguages = [...new Set(loadsData.flatMap(c => c.available.flatMap(l => l.languages.split(', '))))];

    // --- FILTERING LOGIC ---
    function getFilteredData() {
        const lowerCaseSearchTerm = searchBar.value.toLowerCase().trim();

        return loadsData
            .map(cityData => {
                let availableLoads = cityData.available;

                if (lowerCaseSearchTerm) {
                    availableLoads = availableLoads.filter(load =>
                        load.from.toLowerCase().includes(lowerCaseSearchTerm) ||
                        ((load as any).fromArea && (load as any).fromArea.toLowerCase().includes(lowerCaseSearchTerm)) ||
                        load.to.toLowerCase().includes(lowerCaseSearchTerm) ||
                        ((load as any).toArea && (load as any).toArea.toLowerCase().includes(lowerCaseSearchTerm))
                    );
                }

                if (activeFilters.truckTypes.length > 0) {
                     availableLoads = availableLoads.filter(load => activeFilters.truckTypes.includes(load.type));
                }

                if (activeFilters.languages.length > 0) {
                    availableLoads = availableLoads.filter(load => 
                        activeFilters.languages.some(lang => load.languages.includes(lang))
                    );
                }

                if (activeFilters.minTonnage !== null) {
                    availableLoads = availableLoads.filter(load => load.tonnage >= activeFilters.minTonnage);
                }
                 if (activeFilters.maxTonnage !== null) {
                    availableLoads = availableLoads.filter(load => load.tonnage <= activeFilters.maxTonnage);
                }
    
                return { ...cityData, available: availableLoads };
            })
            .filter(cityData => {
                return cityData.city.toLowerCase().includes(lowerCaseSearchTerm) || cityData.available.length > 0;
            });
    }

    // --- RENDER FUNCTIONS ---
    function renderLoads() {
        loadsList.innerHTML = '';
        const filteredData = getFilteredData();
    
        if (filteredData.length === 0) {
            loadsList.innerHTML = `<div class="placeholder-text">No loads found matching your search and filters.</div>`;
            return;
        }

        filteredData.forEach(item => {
            const hasLoads = item.available && item.available.length > 0;
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';
            accordionItem.innerHTML = `
                <div class="accordion-header" data-city="${item.city}">
                    <div>
                        <div class="load-count">
                            <span class="count">${item.available.length > 0 ? item.available.length : item.loads}</span>
                            <span class="label">${item.available.length > 0 ? 'Available' : 'Loads'}</span>
                        </div>
                        <span class="city-name">${item.city}</span>
                    </div>
                    <svg class="accordion-arrow" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                </div>
                <div class="accordion-content">
                    ${hasLoads ? item.available.map(load => getLoadCardHTML(load)).join('') : '<div class="placeholder-text">No loads available for this city matching filters.</div>'}
                </div>
            `;
            loadsList.appendChild(accordionItem);
        });
    }
    
    function renderMap() {
        loadsMapContainer.innerHTML = '';
        const filteredData = getFilteredData();
        const bounds = { minLat: 90, maxLat: -90, minLon: 180, maxLon: -180 };

        const citiesWithLoads = filteredData.filter(c => c.available.length > 0);

        if (citiesWithLoads.length === 0) {
            loadsMapContainer.innerHTML = `<div class="placeholder-text">No loads found on map for current filters.</div>`;
            return;
        }

        citiesWithLoads.forEach(city => {
            bounds.minLat = Math.min(bounds.minLat, city.coords.lat);
            bounds.maxLat = Math.max(bounds.maxLat, city.coords.lat);
            bounds.minLon = Math.min(bounds.minLon, city.coords.lon);
            bounds.maxLon = Math.max(bounds.maxLon, city.coords.lon);
        });
        
        // Add some padding to bounds
        const latPad = (bounds.maxLat - bounds.minLat) * 0.1 || 1;
        const lonPad = (bounds.maxLon - bounds.minLon) * 0.1 || 1;
        bounds.minLat -= latPad;
        bounds.maxLat += latPad;
        bounds.minLon -= lonPad;
        bounds.maxLon += lonPad;


        citiesWithLoads.forEach(city => {
            const latPercent = ((city.coords.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
            const lonPercent = ((city.coords.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 100;

            const pin = document.createElement('div');
            pin.className = 'map-pin';
            pin.style.left = `${lonPercent}%`;
            pin.style.top = `${100 - latPercent}%`;
            pin.innerHTML = `
                <div class="pin-icon">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/></svg>
                </div>
                <div class="pin-label">${city.city} (${city.available.length})</div>
            `;

            pin.addEventListener('click', (e) => {
                e.stopPropagation();
                openInfoWindow(city, pin);
            });

            loadsMapContainer.appendChild(pin);
        });
    }
    
    function getLoadCardHTML(load) {
       return `
            <div class="load-card">
                <div class="card-header">
                    <div>
                        <span class="title">${load.type}</span>
                        ${load.new ? '<span class="tag">New</span>' : ''}
                    </div>
                    <span class="tonnage">${load.tonnage} Ton</span>
                </div>
                <div class="route">
                    <div class="route-points">
                        <div class="point">1</div>
                        <div class="line"></div>
                        <div class="point">2</div>
                    </div>
                    <div class="route-details">
                        <div>
                            <div class="city">${load.from}</div>
                            ${(load as any).fromArea ? `<div class="area">${(load as any).fromArea}</div>` : ''}
                        </div>
                        <div>
                            <div class="city">${load.to}</div>
                            ${(load as any).toArea ? `<div class="area">${(load as any).toArea}</div>` : ''}
                        </div>
                    </div>
                </div>
                <div class="agent-info">
                    <div class="agent-details">
                         <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#ccc" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                         <div>
                            <div class="name">${load.agent}</div>
                            <div class="languages">Speaks ${load.languages}</div>
                         </div>
                    </div>
                    <button class="action-button">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        <span>Call</span>
                    </button>
                </div>
            </div>`;
    }

    function openInfoWindow(cityData, pinElement) {
        closeInfoWindow(); // Close any existing window
        const infoWindow = document.createElement('div');
        infoWindow.className = 'map-info-window';
        infoWindow.style.left = pinElement.style.left;
        infoWindow.style.top = pinElement.style.top;
        infoWindow.innerHTML = `
            <div class="info-window-header">
                <span class="city-name">${cityData.city}</span>
                <button class="close-btn">&times;</button>
            </div>
            <div class="info-window-body">
                ${cityData.available.map(load => getLoadCardHTML(load)).join('')}
            </div>
        `;
        loadsMapContainer.appendChild(infoWindow);

        infoWindow.querySelector('.close-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            closeInfoWindow();
        });
    }

    function closeInfoWindow() {
        const existingWindow = loadsMapContainer.querySelector('.map-info-window');
        if (existingWindow) {
            existingWindow.remove();
        }
    }

    function renderTrips(status) {
        tripsList.innerHTML = '';
        const data = tripsData[status] || [];
        if (data.length === 0) {
            tripsList.innerHTML = `<div class="placeholder"><p>No ${status} trips.</p></div>`;
            return;
        }
        
        data.forEach(trip => {
            const tripCard = document.createElement('div');
            tripCard.className = 'trip-card';
            
            let additionalDetails = '';
            let tripActions = '';

            switch(status) {
                case 'pod':
                    additionalDetails = `<div class="status-message">${trip.statusMessage}</div>`;
                    tripActions = `<div class="trip-actions"><button class="trip-action-btn primary">Submit POD</button></div>`;
                    break;
                case 'invoiced':
                    additionalDetails = `
                        <div class="payment-details">
                            <div><span>Advance:</span> ${trip.advance}</div>
                            <div><span>Balance:</span> ${trip.balance}</div>
                            <div class="status-message">${trip.statusMessage}</div>
                        </div>`;
                    break;
                case 'balance':
                    additionalDetails = `
                         <div class="payment-details">
                            <div><span>Advance:</span> ${trip.advance}</div>
                            <div><span>Balance:</span> <strong>${trip.balance}</strong></div>
                            <div class="status-message">${trip.statusMessage}</div>
                        </div>`;
                    tripActions = `<div class="trip-actions"><button class="trip-action-btn primary">Settle Balance</button></div>`;
                    break;
                case 'paid':
                    tripActions = `<div class="trip-actions"><span class="status-tag paid">Paid</span></div>`;
                    break;
            }

            tripCard.innerHTML = `
                <div class="trip-card-main">
                    <div class="route-points">
                        ${trip.from.map((_, index) => `<div class="point">${index + 1}</div><div class="${index < trip.from.length - 1 ? 'line' : ''}"></div>`).join('')}
                    </div>
                    <div class="trip-details">
                        ${trip.from.map(loc => `<div>${loc}</div>`).join('')}
                    </div>
                    <div class="trip-info">
                        <div class="trip-id">${trip.id}</div>
                        <div class="date">${trip.date}</div>
                        <div class="truck-no">${trip.truck}</div>
                    </div>
                </div>
                ${(additionalDetails || tripActions) ? `
                <div class="trip-card-footer">
                    ${additionalDetails}
                    ${tripActions}
                </div>` : ''}
            `;
            tripsList.appendChild(tripCard);
        });
    }

    function renderTrucks() {
        trucksSelectionList.innerHTML = '';
        trucksData.forEach(truck => {
            const item = document.createElement('div');
            item.className = 'truck-selection-item';
            item.dataset.truckId = truck.id;
            const statusClass = truck.status.toLowerCase().replace(' ', '-');
            item.innerHTML = `<span class="truck-id">${truck.id}</span><span class="status ${statusClass}">${truck.status}</span>`;
            item.addEventListener('click', () => selectTruck(truck.id));
            trucksSelectionList.appendChild(item);
        });
    }

    function selectTruck(truckId) {
        if (truckAnimationInterval) {
            cancelAnimationFrame(truckAnimationInterval);
            truckAnimationInterval = null;
        }

        selectedTruckId = truckId;

        document.querySelectorAll('.truck-selection-item').forEach(item => {
            item.classList.toggle('active', (item as HTMLElement).dataset.truckId === truckId);
        });

        const truck = trucksData.find(t => t.id === truckId);
        if (truck) {
            renderTruckMap(truck);
            updateTruckDetailsPanel(truck);
            truckDetailsPanel.classList.add('visible');
        }
    }

    function renderTruckMap(truck) {
        if (truckAnimationInterval) cancelAnimationFrame(truckAnimationInterval);
        trucksMapContainer.innerHTML = '';

        const bounds = { minLat: 90, maxLat: -90, minLon: 180, maxLon: -180 };
        truck.route.forEach(p => {
            bounds.minLat = Math.min(bounds.minLat, p.lat);
            bounds.maxLat = Math.max(bounds.maxLat, p.lat);
            bounds.minLon = Math.min(bounds.minLon, p.lon);
            bounds.maxLon = Math.max(bounds.maxLon, p.lon);
        });

        const latPad = (bounds.maxLat - bounds.minLat) * 0.1 || 0.5;
        const lonPad = (bounds.maxLon - bounds.minLon) * 0.1 || 0.5;
        bounds.minLat -= latPad;
        bounds.maxLat += latPad;
        bounds.minLon -= lonPad;
        bounds.maxLon += lonPad;
        
        const getMapCoords = (lat, lon) => ({
            x: ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 100,
            y: ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100
        });

        const routeContainer = document.createElement('div');
        trucksMapContainer.appendChild(routeContainer);
        
        // Draw full route (grayed out)
        for (let i = 0; i < truck.route.length - 1; i++) {
            const p1 = getMapCoords(truck.route[i].lat, truck.route[i].lon);
            const p2 = getMapCoords(truck.route[i+1].lat, truck.route[i+1].lon);
            const line = document.createElement('div');
            line.className = 'route-line';
            const length = Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2);
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
            line.style.width = `${length}%`;
            line.style.left = `${p1.x}%`;
            line.style.top = `${p1.y}%`;
            line.style.transform = `rotate(${angle}deg)`;
            routeContainer.appendChild(line);
        }

        const truckPin = document.createElement('div');
        truckPin.className = 'truck-pin';
        truckPin.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/></svg>`;
        trucksMapContainer.appendChild(truckPin);

        const traveledRouteContainer = document.createElement('div');
        trucksMapContainer.appendChild(traveledRouteContainer);

        let lastDrawnIndex = 0;
        const drawTraveledSegment = (fromIndex, toIndex) => {
            if (fromIndex >= toIndex) return;
             for (let i = fromIndex + 1; i <= toIndex; i++) {
                const p1 = getMapCoords(truck.route[i - 1].lat, truck.route[i - 1].lon);
                const p2 = getMapCoords(truck.route[i].lat, truck.route[i].lon);
                const line = document.createElement('div');
                line.className = 'route-line traveled';
                const length = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
                line.style.width = `${length}%`;
                line.style.left = `${p1.x}%`;
                line.style.top = `${p1.y}%`;
                line.style.transform = `rotate(${angle}deg)`;
                traveledRouteContainer.appendChild(line);
            }
            lastDrawnIndex = toIndex;
        };

        const updatePinPosition = (index) => {
            const currentPoint = truck.route[index];
            const { x, y } = getMapCoords(currentPoint.lat, currentPoint.lon);
            truckPin.style.left = `${x}%`;
            truckPin.style.top = `${y}%`;
        };
        
        const initialIndex = truck.currentCoordIndex;
        updatePinPosition(initialIndex);
        drawTraveledSegment(0, initialIndex);


        if (truck.status === 'In Transit') {
            let lastTimestamp = 0;
            const animationSpeed = 50; // ms per point

            const animate = (timestamp) => {
                if (!lastTimestamp) lastTimestamp = timestamp;
                const elapsed = timestamp - lastTimestamp;

                if (elapsed >= animationSpeed) {
                    if (truck.currentCoordIndex < truck.route.length - 1) {
                        const newIndex = truck.currentCoordIndex + 1;
                        truck.currentCoordIndex = newIndex;
                        updatePinPosition(newIndex);
                        drawTraveledSegment(newIndex - 1, newIndex);
                        lastTimestamp = timestamp;
                    } else {
                        cancelAnimationFrame(truckAnimationInterval);
                        truckAnimationInterval = null;
                        return;
                    }
                }
                truckAnimationInterval = requestAnimationFrame(animate);
            };
            truckAnimationInterval = requestAnimationFrame(animate);
        }
    }


    function updateTruckDetailsPanel(truck) {
        const statusClass = truck.status.toLowerCase().replace(' ', '-');
        truckDetailsPanel.innerHTML = `
            <div class="panel-header">
                <h3>${truck.id}</h3>
                <span class="status ${statusClass}">${truck.status}</span>
            </div>
            <div class="panel-body">
                <div class="panel-section">
                    <h4>Live Status</h4>
                    <div class="info-row">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        <span>${truck.currentLocation}</span>
                    </div>
                    <div class="info-row">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                        <span>ETA: ${truck.eta}</span>
                    </div>
                </div>
                <div class="panel-section">
                    <h4>Current Load</h4>
                    ${truck.loadId ? `
                    <div class="info-row">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                        <span>Load ID: ${truck.loadId}</span>
                    </div>
                    <div class="route">
                        <div class="route-points">
                            <div class="point">1</div>
                            <div class="line"></div>
                            <div class="point">2</div>
                        </div>
                        <div class="route-details">
                            <div><div class="city">${truck.from}</div></div>
                            <div><div class="city">${truck.to}</div></div>
                        </div>
                    </div>
                    ` : `
                    <div class="info-row">
                         <svg viewBox="0 0 24 24"><path fill="currentColor" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
                        <span>No active load</span>
                    </div>
                    `}
                </div>
            </div>
        `;
    }

    function renderBankDetails() {
        if (!primaryBankAccount) {
            bankDetailsContent.innerHTML = `
                <div class="add-bank-prompt">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                    <p>No primary bank account has been added.</p>
                    <button class="add-bank-btn">Add Bank Account</button>
                </div>
            `;
        } else {
            const maskedAccountNumber = `•••• •••• ${primaryBankAccount.accountNumber.slice(-4)}`;
            bankDetailsContent.innerHTML = `
                 <div class="bank-details-card">
                    <div class="bank-logo">
                         <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74zM11.5 0L2 6v2h19V6l-9.5-6z"/></svg>
                        <div>
                            <div class="bank-name">${primaryBankAccount.bankName}</div>
                        </div>
                    </div>
                    <div class="bank-info-row">
                        <div class="label">Account Holder</div>
                        <div class="value">${primaryBankAccount.accountHolder}</div>
                    </div>
                     <div class="bank-info-row">
                        <div class="label">Account Number</div>
                        <div class="value">${maskedAccountNumber}</div>
                    </div>
                     <div class="bank-info-row">
                        <div class="label">IFSC Code</div>
                        <div class="value">${primaryBankAccount.ifsc}</div>
                    </div>
                    <div class="bank-actions">
                        <button class="change-btn">Change Account</button>
                    </div>
                </div>
            `;
        }
    }
    
    function renderUserDetails() {
        const maskedPAN = `••••••${userDetails.pan.slice(-4)}`;
        const maskedAadhaar = `•••• •••• ${userDetails.aadhaar.slice(-4)}`;

        userDetailsContent.innerHTML = `
            <div class="details-card">
                <div class="details-card-header">Personal Information</div>
                <div class="details-info-row">
                    <div class="label">Name</div>
                    <div class="value">${userDetails.name}</div>
                </div>
                <div class="details-info-row">
                    <div class="label">User ID / PIN</div>
                    <div class="value">${userDetails.pin}</div>
                </div>
                <div class="details-info-row">
                    <div class="label">Alternate Mobile</div>
                    <div class="value">${userDetails.alternateMobile}</div>
                </div>
                <div class="details-info-row">
                    <div class="label">PAN Card</div>
                    <div class="value">${maskedPAN}</div>
                </div>
                 <div class="details-info-row">
                    <div class="label">Aadhaar Card</div>
                    <div class="value">${maskedAadhaar}</div>
                </div>
            </div>
            <div class="details-card">
                <div class="details-card-header">Vehicle Details</div>
                 <div class="details-info-row">
                    <div class="label">Truck Number</div>
                    <div class="value">${userDetails.vehicle.truckNumber}</div>
                </div>
                <div class="document-actions">
                    <button class="document-btn">RC Proof</button>
                    <button class="document-btn">Insurance Policy</button>
                    <button class="document-btn">Permit</button>
                </div>
            </div>
        `;
    }

    function renderReports() {
        reportsContent.innerHTML = `
            <div class="report-filters">
                <select class="date-range-selector">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last 6 months</option>
                </select>
                <button class="download-statement-btn">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>
                    <span>Download</span>
                </button>
            </div>
            <div class="reports-list">
                ${reportsData.map(trip => `
                    <div class="report-trip-card">
                        <div class="report-card-header">
                            <div class="report-route">
                                <span>${trip.from}</span>
                                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                                <span>${trip.to}</span>
                            </div>
                            <div class="report-date">${trip.date}</div>
                        </div>
                        <div class="report-card-body">
                            <div class="report-detail"><strong>Truck:</strong> ${trip.truck}</div>
                            <div class="report-detail"><strong>Load ID:</strong> ${trip.id}</div>
                        </div>
                        <div class="report-card-footer">
                            <div class="report-amount">₹${trip.amount}</div>
                            <div class="status-tag paid">${trip.status}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderSupportTickets() {
        if (supportTicketsData.length === 0) {
            supportTicketsList.innerHTML = `
                <div class="placeholder">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M21.99 8c0-.55-.45-1-1-1h-16c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-10zm-2-7H4.99C3.89 1 3 1.9 3 3v.01L3.01 4H20v13h2V3c0-1.1-.9-2-2-2z"/></svg>
                    <p>No support tickets</p>
                    <button class="action-button" id="raise-new-ticket-placeholder-btn">Raise a New Ticket</button>
                </div>
            `;
            raiseTicketFab.classList.add('hidden');
        } else {
            supportTicketsList.innerHTML = supportTicketsData.map(ticket => `
                <div class="ticket-card" data-ticket-id="${ticket.id}">
                    <div class="ticket-card-header">
                        <div class="ticket-subject">${ticket.subject}</div>
                        <div class="status-tag ${ticket.status.toLowerCase()}">${ticket.status}</div>
                    </div>
                    <div class="ticket-card-footer">
                        <div class="ticket-id">${ticket.id}</div>
                        <div class="ticket-update">Last update: ${ticket.lastUpdate}</div>
                    </div>
                </div>
            `).join('');
            raiseTicketFab.classList.remove('hidden');
        }
    }

    function renderTicketChat(ticketId) {
        currentTicketId = ticketId;
        const ticket = supportTicketsData.find(t => t.id === ticketId);
        if (!ticket) return;

        ticketChatSubject.textContent = ticket.subject;
        ticketChatId.textContent = ticket.id;

        ticketChatMessages.innerHTML = ticket.conversation.map(msg => `
            <div class="message-bubble-wrapper ${msg.sender}">
                <div class="message-bubble">
                    <div class="message-text">${msg.message}</div>
                    <div class="message-timestamp">${msg.timestamp}</div>
                </div>
            </div>
        `).join('');

        // Scroll to bottom
        ticketChatMessages.scrollTop = ticketChatMessages.scrollHeight;

        setActiveScreen('screen-ticket-chat');
        appHeader.style.display = 'none';
    }


    function renderCurrentLoadsView() {
        if (currentLoadsView === 'list') {
            renderLoads();
        } else {
            renderMap();
        }
    }


    // --- UI FUNCTIONS ---
    function updateHeader() {
        const headerContent = headers[currentScreen];
        if (currentScreen === 'profile') {
             appHeader.style.display = 'none';
        } else {
             appHeader.style.display = 'flex';
             appHeader.innerHTML = `
                <img src="1000033983.png" alt="SSVT Logo" class="header-logo">
                <span id="header-title">${headerContent}</span>
             `;
        }
    }
    
    function setActiveScreen(screenIdWithPrefix) {
        screens.forEach(screen => {
            screen.classList.toggle('hidden', screen.id !== screenIdWithPrefix);
        });
    }

    function showScreen(screenId) {
        currentScreen = screenId;
        setActiveScreen(`screen-${screenId}`);

        navButtons.forEach(button => {
            // FIX: Use 'instanceof HTMLElement' as a type guard to safely access the 'dataset' property.
            if (button instanceof HTMLElement) {
                button.classList.toggle('active', button.dataset.screen === screenId);
            }
        });
        
        updateHeader();
        
        if (screenId === 'support') {
            renderSupportTickets();
        }
        
        if (screenId !== 'trucks' && truckAnimationInterval) {
            cancelAnimationFrame(truckAnimationInterval);
            truckAnimationInterval = null;
        }
    }

    function showAuthScreen(screenId) {
        authScreens.forEach(screen => {
            screen.classList.toggle('hidden', screen.id !== screenId);
        });
        if (screenId === 'screen-signup') {
            Object.values(signupSteps).forEach(step => step.classList.add('hidden'));
            signupSteps['1'].classList.remove('hidden');
        }
    }

    function handleLogin() {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        showScreen('loads');
    }
    

    function openFilterModal(filterType: string) {
        currentFilterType = filterType;
        modalBody.innerHTML = ''; // Clear previous content

        switch (filterType) {
            case 'truckType':
                modalTitle.textContent = 'Filter by Truck Type';
                allTruckTypes.forEach(type => {
                    modalBody.innerHTML += `
                        <div class="filter-option">
                            <label for="truck-${type}">${type}</label>
                            <input type="checkbox" id="truck-${type}" value="${type}" ${activeFilters.truckTypes.includes(type) ? 'checked' : ''}>
                        </div>`;
                });
                break;
            case 'language':
                modalTitle.textContent = 'Filter by Language';
                 allLanguages.forEach(lang => {
                    modalBody.innerHTML += `
                        <div class="filter-option">
                            <label for="lang-${lang}">${lang}</label>
                            <input type="checkbox" id="lang-${lang}" value="${lang}" ${activeFilters.languages.includes(lang) ? 'checked' : ''}>
                        </div>`;
                });
                break;
            case 'tonnage':
                 modalTitle.textContent = 'Filter by Tonnage';
                 modalBody.innerHTML = `
                    <div class="tonnage-filter">
                        <input type="number" id="min-tonnage" placeholder="Min" value="${activeFilters.minTonnage || ''}">
                        <span>-</span>
                        <input type="number" id="max-tonnage" placeholder="Max" value="${activeFilters.maxTonnage || ''}">
                    </div>
                 `;
                 break;
        }
        filterModal.classList.remove('hidden');
    }
    
    function closeFilterModal() {
        filterModal.classList.add('hidden');
    }

    function applyFilters() {
        switch (currentFilterType) {
            case 'truckType':
                const selectedTypes = modalBody.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
                activeFilters.truckTypes = Array.from(selectedTypes).map(cb => cb.value);
                break;
            case 'language':
                 const selectedLangs = modalBody.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
                 activeFilters.languages = Array.from(selectedLangs).map(cb => cb.value);
                break;
            case 'tonnage':
                const min = document.getElementById('min-tonnage') as HTMLInputElement;
                const max = document.getElementById('max-tonnage') as HTMLInputElement;
                activeFilters.minTonnage = min.value ? parseInt(min.value, 10) : null;
                activeFilters.maxTonnage = max.value ? parseInt(max.value, 10) : null;
                break;
        }
        closeFilterModal();
        updateFilterButtonStates();
        renderCurrentLoadsView();
    }
    
    function clearCurrentFilter() {
        switch (currentFilterType) {
            case 'truckType':
                activeFilters.truckTypes = [];
                break;
            case 'language':
                activeFilters.languages = [];
                break;
            case 'tonnage':
                activeFilters.minTonnage = null;
                activeFilters.maxTonnage = null;
                break;
        }
        closeFilterModal();
        updateFilterButtonStates();
        renderCurrentLoadsView();
    }

    function clearAllFilters() {
        activeFilters = {
            truckTypes: [],
            languages: [],
            minTonnage: null,
            maxTonnage: null,
        };
        updateFilterButtonStates();
        renderCurrentLoadsView();
    }

    function updateFilterButtonStates() {
        const truckTypeBtn = document.querySelector('[data-filter-type="truckType"]');
        const languageBtn = document.querySelector('[data-filter-type="language"]');
        const tonnageBtn = document.querySelector('[data-filter-type="tonnage"]');

        truckTypeBtn.classList.toggle('active', activeFilters.truckTypes.length > 0);
        languageBtn.classList.toggle('active', activeFilters.languages.length > 0);
        tonnageBtn.classList.toggle('active', activeFilters.minTonnage !== null || activeFilters.maxTonnage !== null);

        const hasActiveFilters = activeFilters.truckTypes.length > 0 ||
                                 activeFilters.languages.length > 0 ||
                                 activeFilters.minTonnage !== null ||
                                 activeFilters.maxTonnage !== null;
        
        clearAllFiltersBtn.classList.toggle('hidden', !hasActiveFilters);
    }
    
    // --- EVENT LISTENERS ---
    
    // Auth Listeners
    gotoLoginBtn.addEventListener('click', () => showAuthScreen('screen-login'));
    gotoSignupBtn.addEventListener('click', () => showAuthScreen('screen-signup'));
    
    authContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const backButton = target.closest('.back-button');
        // FIX: Cast Element to HTMLElement to access dataset property. Using instanceof for a safe type guard.
        if (backButton instanceof HTMLElement) {
            const targetScreen = backButton.dataset.target;
            if (targetScreen && targetScreen.startsWith('signup-step-')) {
                 Object.values(signupSteps).forEach(step => step.classList.add('hidden'));
                 const stepNum = targetScreen.split('-')[2];
                 signupSteps[stepNum].classList.remove('hidden');
            } else if (targetScreen) {
                showAuthScreen(targetScreen);
            }
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });

    signupForms['1'].addEventListener('submit', (e) => {
        e.preventDefault();
        signupSteps['1'].classList.add('hidden');
        signupSteps['2'].classList.remove('hidden');
    });

    signupForms['2'].addEventListener('submit', (e) => {
        e.preventDefault();
        signupSteps['2'].classList.add('hidden');
        signupSteps['3'].classList.remove('hidden');
    });
    
    signupForms['3'].addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin(); // Simulate login after signup
    });

    uploadInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const preview = target.nextElementSibling.querySelector('.upload-preview') as HTMLImageElement;
                    preview.src = event.target.result as string;
                    preview.style.display = 'block';
                    const placeholder = target.nextElementSibling.querySelector('.upload-placeholder') as HTMLElement;
                    placeholder.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    });


    // Main App Listeners
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // FIX: Cast Element to HTMLElement to access dataset property.
            if (button instanceof HTMLElement) {
                const screenId = button.dataset.screen;
                showScreen(screenId);
            }
        });
    });

    viewToggleListBtn.addEventListener('click', () => {
        currentLoadsView = 'list';
        viewToggleListBtn.classList.add('active');
        viewToggleMapBtn.classList.remove('active');
        loadsList.classList.remove('hidden');
        loadsMapContainer.classList.add('hidden');
        renderLoads();
    });

    viewToggleMapBtn.addEventListener('click', () => {
        currentLoadsView = 'map';
        viewToggleMapBtn.classList.add('active');
        viewToggleListBtn.classList.remove('active');
        loadsMapContainer.classList.remove('hidden');
        loadsList.classList.add('hidden');
        renderMap();
    });

    searchBar.addEventListener('input', renderCurrentLoadsView);

    loadsList.addEventListener('click', (e) => {
        const header = (e.target as HTMLElement).closest('.accordion-header');
        if (header) {
            const content = header.nextElementSibling as HTMLElement;
            const arrow = header.querySelector('.accordion-arrow');
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

            document.querySelectorAll('.accordion-content').forEach(c => {
                 (c as HTMLElement).style.maxHeight = '0px';
                 (c as HTMLElement).previousElementSibling.querySelector('.accordion-arrow').classList.remove('open');
            });
            
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + 'px';
                arrow.classList.add('open');
            }
        }
    });

    document.body.addEventListener('click', (e) => {
        const infoWindow = loadsMapContainer.querySelector('.map-info-window');
        if (infoWindow && !(e.target as HTMLElement).closest('.map-pin')) {
            closeInfoWindow();
        }
    });

    tripsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tripsTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const status = (tab as HTMLElement).dataset.tab;
            renderTrips(status);
        });
    });

    profileMenu.addEventListener('click', (e) => {
        const menuItem = (e.target as HTMLElement).closest('.menu-item');
        if (!menuItem) return;

        const action = menuItem.dataset.action;
        if (action === 'view-bank') {
            renderBankDetails();
            setActiveScreen('screen-bank-details');
        } else if (action === 'view-user-details') {
            renderUserDetails();
            setActiveScreen('screen-user-details');
        } else if (action === 'view-reports') {
            renderReports();
            setActiveScreen('screen-reports');
        }
    });

    backToProfileBtn.addEventListener('click', () => showScreen('profile'));
    backToProfileFromUserBtn.addEventListener('click', () => showScreen('profile'));
    backToProfileFromReportsBtn.addEventListener('click', () => showScreen('profile'));
    
    filterButtonsContainer.addEventListener('click', (e) => {
        const button = (e.target as HTMLElement).closest('.filter-btn');
        if (button && !button.classList.contains('clear-btn')) {
            openFilterModal(button.dataset.filterType);
        }
    });

    modalCloseBtn.addEventListener('click', closeFilterModal);
    modalApplyBtn.addEventListener('click', applyFilters);
    modalClearBtn.addEventListener('click', clearCurrentFilter);
    clearAllFiltersBtn.addEventListener('click', clearAllFilters);
    
    // Support Listeners
    supportTicketsList.addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest('.ticket-card');
        if (card) {
            renderTicketChat(card.dataset.ticketId);
        }
    });
    
    document.body.addEventListener('click', e => {
        if((e.target as HTMLElement).id === 'raise-new-ticket-placeholder-btn') {
            setActiveScreen('screen-new-ticket');
            appHeader.style.display = 'none';
        }
    });
    
    raiseTicketFab.addEventListener('click', () => {
        setActiveScreen('screen-new-ticket');
        appHeader.style.display = 'none';
    });

    backToSupportBtn.addEventListener('click', () => showScreen('support'));
    backToSupportFromNewBtn.addEventListener('click', () => showScreen('support'));

    ticketChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatMessageInput.value.trim();
        if (message && currentTicketId) {
            const ticket = supportTicketsData.find(t => t.id === currentTicketId);
            ticket.conversation.push({ sender: 'user', message, timestamp: 'Now' });
            renderTicketChat(currentTicketId);
            chatMessageInput.value = '';
        }
    });
    
    newTicketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // This is a simulation. In a real app, this would send to a server.
        const subject = (document.getElementById('new-ticket-subject') as HTMLInputElement).value;
        const message = (document.getElementById('new-ticket-message') as HTMLTextAreaElement).value;
        const newTicket = {
            id: `ST-${Math.floor(10000 + Math.random() * 90000)}`,
            subject: subject,
            status: 'Open',
            lastUpdate: 'Just now',
            conversation: [ { sender: 'user', message: message, timestamp: 'Just now' } ]
        };
        supportTicketsData.unshift(newTicket);
        showScreen('support');
        // FIX: Cast newTicketForm to HTMLFormElement to call the reset() method.
        if (newTicketForm instanceof HTMLFormElement) {
            newTicketForm.reset();
        }
    });


    // --- INITIALIZATION ---
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        authContainer.classList.remove('hidden');
        showAuthScreen('screen-welcome');
        setTimeout(() => splashScreen.remove(), 500);
    }, 1500);

    // Initial render
    renderCurrentLoadsView();
    renderTrips('active');
    renderTrucks();
    updateFilterButtonStates();
});