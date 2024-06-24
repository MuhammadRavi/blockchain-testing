import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestDoDto } from './dto/request-do.dto';
import { UpdateStatusDoDto } from './dto/update-status-do.dto';
import { UpdateDoDto } from './dto/update-do.dto';
import { GetDoOrgDto } from './dto/get-do-org.dto';

@Controller('chaincode')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('invoke/do')
  requestDo(@Body() payload: RequestDoDto) {
    return this.appService.requestDo(payload.data);
  }

  @Get('query/do')
  queryAllDo() {
    return this.appService.getAllDo();
  }

  @Get('query/do/co')
  queryAllDoCo(@Body() payload: GetDoOrgDto) {
    return this.appService.getAllDoCo(payload.orgName);
  }

  @Get('query/do/sl')
  queryAllDoSl(@Body() payload: GetDoOrgDto) {
    return this.appService.getAllDoSl(payload.orgName)
  }

  @Get('query/status-do/:orderId')
  queryStatusDo(@Param('orderId') orderId: string) {
    return this.appService.getStatusDo(orderId)
  }

  @Get('query/do/:orderId')
  queryDoByOrderId(@Param('orderId') orderId: string) {
    return this.appService.getDoByOrderId(orderId);
  }

  @Get('query/do/release')
  queryDoRelease() {
    return this.appService.getDoRelease();
  }

  @Put('invoke/status-do/:orderId')
  updateStatusDo(@Param('orderId') orderId: string, @Body() payload: UpdateStatusDoDto) {
    return this.appService.updateStatusDo(orderId, payload)
  }

  @Put('invoke/do/:orderId')
  updateDo(@Param('orderId') orderId: string, @Body() payload: UpdateDoDto) {
    return this.appService.updateDo(orderId, payload.data)
  }

  @Put('invoke/do/decision/:orderId?')
  decisionDo(@Param('orderId') orderId: string, @Query('status') status: string) {
    if (!["Released", "Rejected"].includes(status)) {
      throw new BadRequestException(`Status for Decision DO must have been Released or Rejected`);
    }
    if (status === "Released") {
      return this.appService.releaseDo(orderId);
    } else {
      return this.appService.rejectDo(orderId);
    }
  }

}
