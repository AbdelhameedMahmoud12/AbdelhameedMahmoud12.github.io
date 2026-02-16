// Portfolio Main JavaScript File
// Handles all interactive functionality and animations

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeNavigation();
    initializeTypewriter();
    initializeScrollReveal();
    initializeProjectFilters();
    initializeSkillsChart();
    initializeContactForm();
    initializeProjectModals();
    initializeAnimations();
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId.substring(1));
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// Typewriter effect for hero section
function initializeTypewriter() {
    const typedElement = document.getElementById('typed-name');
    if (typedElement) {
        new Typed('#typed-name', {
            strings: ['Abdelhameed Mahmoud', 'Electronics Engineer', 'Hardware Designer'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Scroll reveal animations
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animate skill bars when they come into view
                if (entry.target.querySelector('.skill-progress')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all sections with reveal animation
    document.querySelectorAll('.section-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Animate skill bars
function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 200);
    });
}

// Project filtering functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        anime({
                            targets: card,
                            opacity: [0, 1],
                            translateY: [30, 0],
                            duration: 600,
                            easing: 'easeOutQuart'
                        });
                    }, index * 100);
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        translateY: -30,
                        duration: 300,
                        easing: 'easeInQuart',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Skills radar chart
function initializeSkillsChart() {
    const chartElement = document.getElementById('skills-chart');
    if (!chartElement) return;

    const chart = echarts.init(chartElement);
    
    const option = {
        title: {
            text: 'Technical Skills Overview',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#2c3e50'
            }
        },
        radar: {
            indicator: [
                { name: 'Digital IC Design', max: 100 },
                { name: 'FPGA Prototyping', max: 100 },
                { name: 'Embedded Systems', max: 100 },
                { name: 'RTL Design', max: 100 },
                { name: 'Verification', max: 100 },
                { name: 'System Architecture', max: 100 },
                { name: 'PCB Design', max: 100 },
                { name: 'Programming', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 5,
            axisName: {
                color: '#666',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: '#e0e0e0'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(230, 126, 34, 0.1)', 'rgba(230, 126, 34, 0.05)']
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [95, 90, 85, 95, 80, 75, 70, 80],
                name: 'Current Level',
                areaStyle: {
                    color: 'rgba(230, 126, 34, 0.3)'
                },
                lineStyle: {
                    color: '#e67e22',
                    width: 3
                },
                itemStyle: {
                    color: '#e67e22',
                    borderColor: '#fff',
                    borderWidth: 2
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };

    chart.setOption(option);

    // Make chart responsive
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Project modal functionality
function initializeProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalTitle || !modalContent) return;

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalTitle || !modalContent) return;

    const projectData = getProjectData(projectId);
    
    modalTitle.textContent = projectData.title;
    modalContent.innerHTML = projectData.content;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Animate modal appearance
    anime({
        targets: modal,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    anime({
        targets: modal.querySelector('.modal-content'),
        scale: [0.8, 1],
        duration: 300,
        easing: 'easeOutBack'
    });
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    anime({
        targets: modal,
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInQuart',
        complete: () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

function getProjectData(projectId) {
    const projects = {
        riscv: {
            title: 'RISC-V CPU Design',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=RISC-V+CPU+Architecture" alt="RISC-V Architecture" class="w-full rounded-lg">
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Project Overview</h3>
                            <p class="text-gray-600 mb-4">
                                A comprehensive 32-bit RISC-V processor implementation featuring a 5-stage pipeline, 
                                hazard detection, and advanced memory management. This project demonstrates 
                                complete RTL-to-GDSII flow capabilities.
                            </p>
                            
                            <h4 class="font-semibold mb-2">Key Features:</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>5-stage pipelined architecture</li>
                                <li>Branch prediction and hazard handling</li>
                                <li>Memory management unit</li>
                                <li>Debug interface and trace capabilities</li>
                                <li>FPGA prototyping validation</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Technical Implementation</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="font-medium">Technology:</span>
                                    <span class="text-gray-600">Verilog, SystemVerilog</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Target Frequency:</span>
                                    <span class="text-gray-600">100 MHz (FPGA)</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Logic Elements:</span>
                                    <span class="text-gray-600">~15,000 LEs</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Memory:</span>
                                    <span class="text-gray-600">64KB Instruction/Data</span>
                                </div>
                            </div>
                            
                            <h4 class="font-semibold mb-2 mt-4">Verification:</h4>
                            <p class="text-gray-600 text-sm">
                                Comprehensive testbench with directed and random testing, 
                                formal verification, and FPGA-based validation.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Project Timeline & Results</h4>
                        <p class="text-gray-600 text-sm">
                            Completed over 6 months with successful validation on Xilinx Artix-7 FPGA. 
                            Achieved target performance with comprehensive test coverage and documentation.
                        </p>
                    </div>
                </div>
            `
        },
        iot: {
            title: 'IoT Sensor Network',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/10B981/FFFFFF?text=IoT+Sensor+Network" alt="IoT Network" class="w-full rounded-lg">
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-3">System Architecture</h3>
                            <p class="text-gray-600 mb-4">
                                A distributed wireless sensor network for environmental monitoring with 
                                real-time data acquisition, edge processing, and cloud connectivity. 
                                Features low-power design and long-range communication.
                            </p>
                            
                            <h4 class="font-semibold mb-2">System Components:</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>Sensor nodes with multiple sensors</li>
                                <li>Gateway with LoRaWAN connectivity</li>
                                <li>Cloud data processing pipeline</li>
                                <li>Mobile application for monitoring</li>
                                <li>Edge computing capabilities</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Technical Specifications</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="font-medium">Microcontroller:</span>
                                    <span class="text-gray-600">STM32L4 Series</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Communication:</span>
                                    <span class="text-gray-600">LoRaWAN, WiFi</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Battery Life:</span>
                                    <span class="text-gray-600">2+ years</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Range:</span>
                                    <span class="text-gray-600">Up to 10km</span>
                                </div>
                            </div>
                            
                            <h4 class="font-semibold mb-2 mt-4">Sensors:</h4>
                            <p class="text-gray-600 text-sm">
                                Temperature, humidity, air quality, motion detection, 
                                and light sensors with configurable sampling rates.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Deployment & Results</h4>
                        <p class="text-gray-600 text-sm">
                            Successfully deployed in smart building application with 20+ sensor nodes. 
                            Achieved 99.5% data reliability and exceeded battery life targets.
                        </p>
                    </div>
                </div>
            `
        },
        sdr: {
            title: 'Software-Defined Radio Platform',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/EF4444/FFFFFF?text=SDR+Platform" alt="SDR Platform" class="w-full rounded-lg">
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Platform Capabilities</h3>
                            <p class="text-gray-600 mb-4">
                                A versatile SDR platform supporting multiple wireless protocols and 
                                signal processing algorithms. Features real-time signal processing 
                                and protocol analysis capabilities.
                            </p>
                            
                            <h4 class="font-semibold mb-2">Supported Protocols:</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>WiFi (802.11 a/b/g/n)</li>
                                <li>Bluetooth Low Energy</li>
                                <li>LoRa and FSK modulation</li>
                                <li>GPS signal processing</li>
                                <li>Custom protocol development</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Hardware Specifications</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="font-medium">FPGA:</span>
                                    <span class="text-gray-600">Xilinx Artix-7</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">ADC/DAC:</span>
                                    <span class="text-gray-600">12-bit, 61.44 MSPS</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Frequency Range:</span>
                                    <span class="text-gray-600">70MHz - 6GHz</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Bandwidth:</span>
                                    <span class="text-gray-600">Up to 56MHz</span>
                                </div>
                            </div>
                            
                            <h4 class="font-semibold mb-2 mt-4">Processing:</h4>
                            <p class="text-gray-600 text-sm">
                                Real-time DSP algorithms implemented in FPGA with 
                                ARM processor for higher-level protocol handling.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Applications & Performance</h4>
                        <p class="text-gray-600 text-sm">
                            Successfully implemented WiFi sniffer, LoRa gateway, and spectrum analyzer. 
                            Real-time processing achieved with <1ms latency for most protocols.
                        </p>
                    </div>
                </div>
            `
        },
        rtos: {
            title: 'Real-Time Operating System',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Real-time+OS" alt="RTOS" class="w-full rounded-lg">
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-3">OS Architecture</h3>
                            <p class="text-gray-600 mb-4">
                                A custom real-time operating system designed for embedded applications 
                                requiring deterministic timing and efficient resource management. 
                                Features preemptive multitasking and low-latency interrupt handling.
                            </p>
                            
                            <h4 class="font-semibold mb-2">Core Features:</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>Preemptive priority-based scheduling</li>
                                <li>Memory protection and management</li>
                                <li>Inter-process communication</li>
                                <li>Device driver framework</li>
                                <li>Power management capabilities</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Technical Details</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="font-medium">Target Platform:</span>
                                    <span class="text-gray-600">ARM Cortex-M4</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Memory Footprint:</span>
                                    <span class="text-gray-600">16KB Flash, 8KB RAM</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Context Switch:</span>
                                    <span class="text-gray-600">< 1μs</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Max Tasks:</span>
                                    <span class="text-gray-600">64 priority levels</span>
                                </div>
                            </div>
                            
                            <h4 class="font-semibold mb-2 mt-4">Scheduling:</h4>
                            <p class="text-gray-600 text-sm">
                                Priority-based preemptive scheduling with round-robin 
                                within same priority levels and configurable time slicing.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Applications & Testing</h4>
                        <p class="text-gray-600 text-sm">
                            Successfully deployed in industrial control systems and IoT devices. 
                            Extensive testing with 100% code coverage and formal verification of critical sections.
                        </p>
                    </div>
                </div>
            `
        },
        crc: {
            title: 'CRC Accelerator Engine',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/6366F1/FFFFFF?text=CRC+Accelerator" alt="CRC Engine" class="w-full rounded-lg">
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Engine Architecture</h3>
                            <p class="text-gray-600 mb-4">
                                High-performance hardware-accelerated CRC calculation engine supporting 
                                multiple polynomial standards. Features parallel processing and 
                                configurable data widths for various applications.
                            </p>
                            
                            <h4 class="font-semibold mb-2">Supported Standards:</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>CRC-32 (IEEE 802.3)</li>
                                <li>CRC-16 (CCITT, IBM)</li>
                                <li>CRC-8 (ATM, SMBus)</li>
                                <li>Custom polynomial support</li>
                                <li>Configurable data width (8-128 bits)</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Performance Metrics</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="font-medium">Max Throughput:</span>
                                    <span class="text-gray-600">100 Gbps</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Latency:</span>
                                    <span class="text-gray-600">1 clock cycle</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Resource Usage:</span>
                                    <span class="text-gray-600">~500 LUTs</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Power:</span>
                                    <span class="text-gray-600">< 10mW</span>
                                </div>
                            </div>
                            
                            <h4 class="font-semibold mb-2 mt-4">Interface:</h4>
                            <p class="text-gray-600 text-sm">
                                AXI4-Stream interface with configurable data width 
                                and automatic polynomial selection based on protocol.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Integration & Validation</h4>
                        <p class="text-gray-600 text-sm">
                            Integrated into networking SoC with comprehensive validation. 
                            Achieved 100% data integrity in stress testing at maximum throughput.
                        </p>
                    </div>
                </div>
            `
        },
        uart: {
            title: 'UART Controller',
            content: `
                <div class="space-y-6">
                    <img src="https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=UART+Controller" alt="UART Controller" class="w-full rounded-lg">
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Controller Features</h3>
                            <p class="text-gray-600 mb-4">
                                Advanced UART controller with flexible configuration options, 
                                FIFO buffers, and multiple protocol support. Designed for 
                                high-speed serial communication in embedded systems.
                            </p>
                            
                            <h4 class="font-semibold mb-2">Key Capabilities:</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>Configurable baud rates up to 10 Mbps</li>
                                <li>16-byte TX/RX FIFO buffers</li>
                                <li>Hardware flow control (RTS/CTS)</li>
                                <li>Multi-drop RS-485 support</li>
                                <li>LIN bus protocol compatibility</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-3">Configuration Options</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="font-medium">Data Bits:</span>
                                    <span class="text-gray-600">5, 6, 7, 8, 9</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Stop Bits:</span>
                                    <span class="text-gray-600">1, 1.5, 2</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Parity:</span>
                                    <span class="text-gray-600">None, Even, Odd</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="font-medium">Baud Rate:</span>
                                    <span class="text-gray-600">300 - 10M</span>
                                </div>
                            </div>
                            
                            <h4 class="font-semibold mb-2 mt-4">Interrupts:</h4>
                            <p class="text-gray-600 text-sm">
                                Configurable interrupts for TX/RX completion, 
                                error conditions, and FIFO status changes.
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Testing & Applications</h4>
                        <p class="text-gray-600 text-sm">
                            Extensively tested with various baud rates and protocols. 
                            Successfully integrated into multiple SoC designs for IoT and industrial applications.
                        </p>
                    </div>
                </div>
            `
        }
    };
    
    return projects[projectId] || { title: 'Project Details', content: '<p>Project details not available.</p>' };
}

// Additional animations
function initializeAnimations() {
    // Animate floating shapes
    anime({
        targets: '.shape',
        translateY: [
            { value: '100vh', duration: 0 },
            { value: '-100px', duration: 20000 }
        ],
        rotate: '360deg',
        loop: true,
        easing: 'linear',
        delay: anime.stagger(5000)
    });

    // Animate skill bars on load
    setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }, 1000);
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 5000);
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && window.innerWidth >= 768) {
        mobileMenu.classList.add('hidden');
    }
});

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);