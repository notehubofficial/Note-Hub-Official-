// Note Hub Official - Global AI Companion Engine

document.addEventListener("DOMContentLoaded", function () {
    // Inject Floating AI Widget HTML dynamically into every page
    const widgetHTML = `
        <div id="aiFloatingWidget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
            <button id="aiToggleBtn" onclick="toggleAIChat()" style="background: linear-gradient(135deg, #00f2fe, #4facfe); border: none; width: 60px; height: 60px; border-radius: 50%; color: #000; font-size: 1.5rem; cursor: pointer; box-shadow: 0 4px 20px rgba(0, 242, 254, 0.4); display: flex; align-items: center; justify-content: center; transition: 0.3s;">
                <i class="fa-solid fa-robot"></i>
            </button>
            
            <div id="aiChatBoxContainer" style="display: none; position: absolute; bottom: 75px; right: 0; width: 350px; height: 450px; background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); flex-direction: column; overflow: hidden;">
                <div style="background: #070b14; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fa-solid fa-brain" style="color: #00f2fe;"></i>
                        <strong style="color: #fff; font-size: 0.95rem;">Note Hub AI Mentor</strong>
                    </div>
                    <span onclick="toggleAIChat()" style="color: #94a3b8; cursor: pointer; font-size: 1.2rem;">&times;</span>
                </div>
                
                <div id="widgetChatBox" style="flex: 1; padding: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.8rem;">
                    <div style="background: rgba(0, 242, 254, 0.1); border: 1px solid #00f2fe; color: #fff; padding: 0.7rem; border-radius: 8px; font-size: 0.85rem; align-self: flex-start;">
                        سلام! میں آپ کا ڈیجیٹل کوڈنگ اور لرننگ پارٹنر ہوں۔ کوئی بھی کوڈنگ ایرر یا سوال پوچھیے، میں آپ کی مدد کے لیے موجود ہوں!
                    </div>
                </div>
                
                <div style="padding: 0.8rem; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 0.5rem; background: #070b14;">
                    <input type="text" id="widgetInput" placeholder="سوال یا کوڈنگ کا مسئلہ پوچھیں..." onkeypress="if(event.key==='Enter') sendWidgetMessage()" style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.1); padding: 0.6rem; border-radius: 6px; color: #fff; font-size: 0.85rem; outline: none;">
                    <button onclick="sendWidgetMessage()" style="background: #00f2fe; border: none; padding: 0.6rem 0.9rem; border-radius: 6px; color: #000; font-weight: bold; cursor: pointer;">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
});

function toggleAIChat() {
    const chatContainer = document.getElementById('aiChatBoxContainer');
    chatContainer.style.display = (chatContainer.style.display === 'none' || chatContainer.style.display === '') ? 'flex' : 'none';
}

async function sendWidgetMessage() {
    const input = document.getElementById('widgetInput');
    const query = input.value.trim();
    if (!query) return;

    const chatBox = document.getElementById('widgetChatBox');

    // Add User Message
    const userDiv = document.createElement('div');
    userDiv.style.cssText = "background: rgba(251, 191, 36, 0.15); border: 1px solid #fbbf24; color: #fff; padding: 0.7rem; border-radius: 8px; font-size: 0.85rem; align-self: flex-end; max-width: 80%;";
    userDiv.innerText = query;
    chatBox.appendChild(userDiv);

    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Add Bot Thinking Message
    const botDiv = document.createElement('div');
    botDiv.style.cssText = "background: rgba(0, 242, 254, 0.1); border: 1px solid #00f2fe; color: #fff; padding: 0.7rem; border-radius: 8px; font-size: 0.85rem; align-self: flex-start; max-width: 80%;";
    botDiv.innerText = "سوچ رہا ہوں...";
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Contextual Page Detector
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/google/gemma-1.1-2b-it", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: `[Page Context: ${currentPage}] User asked: ${query}` })
        });

        const data = await response.json();
        
        if (data && data[0] && data[0].generated_text) {
            botDiv.innerText = data[0].generated_text;
        } else {
            botDiv.innerText = "پریشان نہ ہوں! یہ مسئلہ حل ہو جائے گا۔ آپ اس پیج پر موجود گائیڈز دیکھ سکتے ہیں یا کوڈنگ کا سوال دوبارہ واضح کر کے پوچھ سکتے ہیں۔";
        }
    } catch (e) {
        botDiv.innerText = "میں نوٹ ہب پلیٹ فارم کا اے آئی اسسٹنٹ ہوں۔ کوڈنگ اور تعلیمی مواد میں آپ کی مکمل رہنمائی کے لیے موجود ہوں۔";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
