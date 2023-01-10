"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FileUpload {
    async singleUpload(parent, args) {
        // console.log(args)
        // console.log("hhhh")
        const { createReadStream, filename } = await args.file;
        const stream = createReadStream();
        const dir = process.cwd() + "/FileUpload/";
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        const out = fs_1.default.createWriteStream(`${dir}${filename}`);
        await stream.pipe(out);
    }
}
exports.default = new FileUpload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZV91cGxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvZmlsZV91cGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsTUFBTSxVQUFVO0lBQ2IsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsSUFBSTtRQUU3QixvQkFBb0I7UUFDcEIsc0JBQXNCO1FBQ3RCLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFckQsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsY0FBYyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLFlBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkI7UUFDRCxNQUFNLEdBQUcsR0FBRyxZQUFFLENBQUMsaUJBQWlCLENBQUMsR0FBRyxHQUFHLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN0RCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUNKO0FBRUQsa0JBQWUsSUFBSSxVQUFVLENBQUEifQ==