import { Roles } from '@/_decorators';
import { RolesEnum } from '@/_enum';
import { JwtAuthGuard, RolesGuard, TransactionGuard } from '@/_guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionsBodyDto } from './dto/create-transactionsBody.dto';
import { ReadAllTransactionsDto } from './dto/read-allTransactions.dto';
import { UpdateTransactionsDto } from './dto/update-transactions.dto';
import { TransactionsService } from './transactions.service';

@Controller({
  path: 'transactions',
  version: '1',
})
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.ADOPTER)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async create(
    @Req() req: any,
    @Body() createTransactionBodyDto: CreateTransactionsBodyDto,
  ) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully created new transaction.',
      data: await this.transactionService.create({
        userId: req.user.sub,
        ...createTransactionBodyDto,
      }),
    };
  }

  @Get()
  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ isArray: true })
  async findAll(@Query() query: ReadAllTransactionsDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved all transaction.',
      data: await this.transactionService.findAll(query.skip, query.take),
    };
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.ADOPTER, RolesEnum.SHELTER)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved transaction.',
      data: await this.transactionService.findOne(id),
    };
  }

  @Put(':id')
  @UseGuards(TransactionGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.ADOPTER, RolesEnum.SHELTER)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionsDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully updated transaction.',
      data: await this.transactionService.update(id, updateTransactionDto),
    };
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.ADOPTER, RolesEnum.SHELTER)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully deleted transaction.',
      data: await this.transactionService.remove(id),
    };
  }
}
