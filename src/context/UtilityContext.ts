class UtilityContext {
    private hpContext: any;
    private hpClient: any;

    constructor(hpContext: any, hpClient: any) {
        this.hpContext = hpContext;
        this.hpClient = hpClient;
    }

    public async checkLiveness(ip: string, port: number): Promise<boolean> {
        const server = `wss://${ip}:${port}`;
        console.log(`Checking Hot Pocket liveness at ${server}`);

        return new Promise<boolean>(async (resolve) => {

            const timer = setTimeout(async () => {
                console.log(`Timeout waiting for Hot Pocket liveness of ${server}`)
                await this.hpClient.close();
                resolve(false);
            }, 120000);

            try {
                if (await this.hpClient.connect()) {
                    console.log(`Hot Pocket live at ${server}`);
                    clearTimeout(timer);
                    await this.hpClient.close();
                    resolve(true)
                }
                else {
                    console.log(`Hot Pocket connection failed for ${server}`);
                    clearTimeout(timer);
                    resolve(false);
                }
            }
            catch (err) {
                console.log(`Exception on Hot Pocket connection to ${server}`, err);
                clearTimeout(timer);
                resolve(false);
            }
        })
    }
}

export default UtilityContext;