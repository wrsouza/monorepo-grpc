import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  CUSTOMER_PACKAGE_NAME,
  CUSTOMER_SERVICE_NAME,
  ICustomerService,
} from '@app/common/interfaces';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  CustomerDetailsRequest,
  CustomerDetailsResponse,
} from './dto';
import { JwtAuthGuard } from '../../data/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customers')
export class CustomersController implements OnModuleInit {
  private customersService: ICustomerService;

  constructor(
    @Inject(CUSTOMER_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.customersService = this.client.getService<ICustomerService>(
      CUSTOMER_SERVICE_NAME,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createCustomer(
    @Request() { metadata },
    @Body() request: CreateCustomerRequest,
  ): Observable<CreateCustomerResponse> {
    Logger.log(`POST createCustomerRequest: ${JSON.stringify(request)}`);
    return this.customersService.createCustomer(request, metadata);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  customerDetails(
    @Request() { metadata },
    @Param() request: CustomerDetailsRequest,
  ): Observable<CustomerDetailsResponse> {
    Logger.log(`POST customerDetailsRequest: ${JSON.stringify(request)}`);
    return this.customersService.customerDetails(request, metadata);
  }
}
