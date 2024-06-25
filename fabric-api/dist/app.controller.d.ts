import { AppService } from './app.service';
import { RequestDoDto } from './dto/request-do.dto';
import { UpdateStatusDoDto } from './dto/update-status-do.dto';
import { UpdateDoDto } from './dto/update-do.dto';
import { GetDoOrgDto } from './dto/get-do-org.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    requestDo(payload: RequestDoDto): Promise<any>;
    queryAllDo(): Promise<any>;
    queryAllDoCo(payload: GetDoOrgDto): Promise<any>;
    queryAllDoSl(payload: GetDoOrgDto): Promise<any>;
    queryStatusDo(orderId: string): Promise<any>;
    queryDoByOrderId(orderId: string): Promise<any>;
    queryDoRelease(): Promise<any>;
    updateStatusDoCo(orderId: string, payload: UpdateStatusDoDto): Promise<any>;
    updateStatusDoSl(orderId: string, payload: UpdateStatusDoDto): Promise<any>;
    updateDoCo(orderId: string, payload: UpdateDoDto): Promise<any>;
    updateDoSl(orderId: string, payload: UpdateDoDto): Promise<any>;
    decisionDo(orderId: string, status: string): Promise<any>;
}
