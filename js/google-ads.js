function openWhatsApp(message) {
            // Close the chat window
            document.getElementById('whatsappChatContainer').classList.remove('active');
            
            // Open WhatsApp with the pre-filled message
            const phoneNumber = '9463423356';
            const url = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(url, '_blank');
        }
        
        document.addEventListener('tvx:page:load', function() {
            const whatsappChatToggle = document.getElementById('whatsappChatToggle');
            const whatsappChatContainer = document.getElementById('whatsappChatContainer');
            const whatsappCloseBtn = document.getElementById('whatsappCloseBtn');
            if (!whatsappChatToggle || whatsappChatToggle.dataset.waChatBound === 'true') {
                return;
            }
            whatsappChatToggle.dataset.waChatBound = 'true';
            
            // Toggle chat visibility
            whatsappChatToggle.addEventListener('click', function() {
                whatsappChatContainer.classList.toggle('active');
                
                // Auto-scroll to bottom when chat opens
                if (whatsappChatContainer.classList.contains('active')) {
                    setTimeout(() => {
                        whatsappChatMessages.scrollTop = whatsappChatMessages.scrollHeight;
                    }, 100);
                }
            });
            
            // Close chat
            whatsappCloseBtn.addEventListener('click', function() {
                whatsappChatContainer.classList.remove('active');
            });
            
            // WhatsApp direct link functionality - open WhatsApp with default message
            whatsappChatToggle.addEventListener('click', function() {
                // If chat is closed, open it
                if (!whatsappChatContainer.classList.contains('active')) {
                    whatsappChatContainer.classList.add('active');
                } else {
                    // If chat is already open, close it and redirect to WhatsApp
                    setTimeout(() => {
                        if (!whatsappChatContainer.classList.contains('active')) {
                            const phoneNumber = '9463423356';
                            const defaultMessage = 'Hi%20TechViOnyx!%20I%27d%20like%20to%20discuss%20your%20services.';
                            const url = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
                            window.open(url, '_blank');
                        }
                    }, 300);
                }
            });
        });


