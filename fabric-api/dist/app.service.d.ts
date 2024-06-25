import { UpdateStatusDoDto } from './dto/update-status-do.dto';
export declare class AppService {
    requestDo(data: string): Promise<any>;
    getAllDo(): Promise<any>;
    getStatusDo(orderId: string): Promise<any>;
    updateStatusDoCo(orderId: string, data: UpdateStatusDoDto): Promise<any>;
    updateStatusDoSl(orderId: string, data: UpdateStatusDoDto): Promise<any>;
    updateDoCo(orderId: string, data: string): Promise<any>;
    updateDoSl(orderId: string, data: string): Promise<any>;
    releaseDo(orderId: string): Promise<any>;
    rejectDo(orderId: string): Promise<any>;
    getDoByOrderId(orderId: string): Promise<any>;
    getDoRelease(): Promise<any>;
    getAllDoCo(coName: string): Promise<any>;
    getAllDoSl(slName: string): Promise<any>;
}
