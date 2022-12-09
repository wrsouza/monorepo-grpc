import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
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
  createCustomer(
    @Body() createCustomerRequest: CreateCustomerRequest,
  ): Observable<CreateCustomerResponse> {
    Logger.log(
      `POST createCustomerRequest: ${JSON.stringify(createCustomerRequest)}`,
    );
    return this.customersService.createCustomer({ ...createCustomerRequest });
  }

  @Get(':id')
  customerDetails(
    @Param() { id }: CustomerDetailsRequest,
  ): Observable<CustomerDetailsResponse> {
    Logger.log(`POST customerDetailsRequest: ${id}`);
    return this.customersService.customerDetails({ id });
  }
}
