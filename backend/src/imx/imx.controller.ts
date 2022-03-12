import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ClaimDto } from './dto';
import { ImxService } from './imx.service';
import { LeaderBoardService } from 'src/leaderboard/leaderBoard.service';


@Controller('imx')
export class ImxController {
  constructor(private readonly imxService: ImxService, private readonly leaderBoardService:LeaderBoardService) {}

  @Post('/claim')
  async claimToken(@Body() claimDto: ClaimDto) {

    const walletDetails = await this.imxService.findOne({ tokenId: claimDto.tokenId, inWallet:true });
    if(!walletDetails) throw new HttpException(`Can't transfer token ${claimDto.tokenId} to wallet`, HttpStatus.BAD_REQUEST);

    const user = await this.imxService.getImxUser(walletDetails.user)
    if(!user) throw new HttpException(`user ${walletDetails.user} not registered to Immutable`, HttpStatus.BAD_REQUEST);
    const result = await this.imxService.transferToken(walletDetails.tokenId, walletDetails.user);

    await this.imxService.transferToken(walletDetails.tokenId, walletDetails.user);

    walletDetails.inWallet = true;
    await walletDetails.save();

    return result;
  }

  @Get('/user/:walletAddress')
  async getUser(@Param() params) {
    const walletAddress = params.walletAddress;
    let user:any = {};
    const walletDetails = await this.imxService.findOne({ user: walletAddress });
    user.wallet = walletDetails;
    const scores = await this.leaderBoardService.getLeaderBoard({ user: walletAddress, sort:null });
    user.score = scores[0]?.count;
    return user
  }
}