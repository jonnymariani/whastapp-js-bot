import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi, CreateImageRequestSizeEnum } from "openai"

dotenv.config();

class ChatGPTHandler {

	private configuration = new Configuration({
        organization: process.env.ORGANIZATION_ID,
        apiKey: process.env.OPENAI_KEY,
    });

    private openai = new OpenAIApi(this.configuration);

	async getDavinciResponse(clientText:string, temperature = 0.5, maxTokens = 4000): Promise<string>{
        
        const options = {
            model: "text-davinci-003", // Modelo GPT a ser usado
            prompt: "Responda ao texto como se estivesse respondendo a uma mensagem de um amigo: " +  clientText , // Texto enviado pelo usuário
            temperature, // Nível de variação das respostas geradas, 1 é o máximo
            max_tokens: maxTokens, // Quantidade de tokens (palavras) a serem retornadas pelo bot, 4000 é o máximo
            // 'frequency_penalty': 0,
            // 'presence_penalty': 0.6,
           // stop: 'Human'
        }

        try {
            const response = await this.openai.createCompletion(options);

            let botResponse = "";
    
            response.data.choices.forEach(({ text }) => {
                botResponse += text
            });    
    
            return `${botResponse.trim()}`
    
        }
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         catch (e:any) {
            return `OpenAI Response Error: ${e.response.data.error.message}`
        }
	}

    async getDalleResponse(clientText:string, n = 1, size = "512x512" as CreateImageRequestSizeEnum) {
        const options = {
            prompt: clientText, // Descrição da imagem
            n,
            size             
        }
    
        try {
            const response = await this.openai.createImage(options);

            return response.data.data[0].url;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (e:any) {
            return e.response.data.error.message;
        }
    }

}

export {ChatGPTHandler};
