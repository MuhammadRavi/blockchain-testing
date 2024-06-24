import { AppService } from './app.service';
import { RequestDoDto } from './dto/request-do.dto';
import { UpdateStatusDoDto } from './dto/update-status-do.dto';
import { UpdateDoDto } from './dto/update-do.dto';
import { GetDoOrgDto } from './dto/get-do-org.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    requestDo(payload: RequestDoDto): Promise<any>;
    queryAllDo(): Promise<string>;
    queryAllDoCo(payload: GetDoOrgDto): Promise<string>;
    queryAllDoSl(payload: GetDoOrgDto): Promise<string>;
    queryStatusDo(orderId: string): Promise<string>;
    queryDoByOrderId(orderId: string): Promise<string>;
    queryDoRelease(): Promise<string>;
    updateStatusDo(orderId: string, payload: UpdateStatusDoDto): Promise<any>;
    updateDo(orderId: string, payload: UpdateDoDto): Promise<any>;
    decisionDo(orderId: string, status: string): Promise<any>;
}
