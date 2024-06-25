import { UpdateStatusDoDto } from './dto/update-status-do.dto';
export declare class AppService {
    requestDo(data: string): Promise<any>;
    getAllDo(): Promise<string>;
    getStatusDo(orderId: string): Promise<string>;
    updateStatusDoCo(orderId: string, data: UpdateStatusDoDto): Promise<any>;
    updateStatusDoSl(orderId: string, data: UpdateStatusDoDto): Promise<any>;
    updateDoCo(orderId: string, data: string): Promise<any>;
    updateDoSl(orderId: string, data: string): Promise<any>;
    releaseDo(orderId: string): Promise<any>;
    rejectDo(orderId: string): Promise<any>;
    getDoByOrderId(orderId: string): Promise<string>;
    getDoRelease(): Promise<string>;
    getAllDoCo(coName: string): Promise<string>;
    getAllDoSl(slName: string): Promise<string>;
}
