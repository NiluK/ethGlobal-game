import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Imx } from './imx.model';
import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { ImmutableXClient, ImmutableMethodParams, ERC721TokenType } from '@imtbl/imx-sdk';
import { BigNumber } from '@ethersproject/bignumber/';
import { MetadataService } from 'src/metadata/metadata.service';
import { CreateMetadataDto } from 'src/metadata/dto';

@Injectable()
export class ImxService {

  admin:ImmutableXClient;

  constructor(
    @InjectModel('Imx') private readonly imxModel: Model<Imx>,
    private readonly metadataService:MetadataService) {
    const client = {
      starkContractAddress: process.env.STARK_CONTRACT_ADDRESS,
      registrationContractAddress: process.env.REGISTRATION_ADDRESS,
      gasLimit: process.env.GAS_LIMIT,
      gasPrice: process.env.GAS_PRICE,
      publicApiUrl: process.env.PUBLIC_API_URL,
    };

    const provider = new AlchemyProvider(
      process.env.ETH_NETWORK,
      process.env.ALCHEMY_API_KEY,
    );

    ImmutableXClient.build({
      ...client,
      signer: new Wallet(process.env.PRIVATE_KEY).connect(provider),
    }).then(admin=> this.admin = admin)
  }

  async mintFor(walletAddress: string): Promise<any> {
    try {
      let tokenId = 1;


      const lastElement = await this.imxModel
        .findOne()
        .sort({ tokenId: 'descending' })
        .exec();
      if (lastElement?.tokenId) {
        tokenId += Number(lastElement.tokenId);
      }

      const isUserExist = await this.getImxUser(walletAddress);

      const payload: ImmutableMethodParams.ImmutableOffchainMintV2ParamsTS = [
        {
          contractAddress: process.env.TOKEN_ADDRESS,
          users: [
            {
              etherKey: isUserExist ? walletAddress.toLowerCase() : this.admin.address,
              tokens: [
                {
                  id: tokenId.toString(),
                  blueprint: 'onchain-metadata',
                },
              ],
            },
          ],
        },
      ];

      await this.admin.mintV2(payload);

      const metadata = await this.metadataService.createWithRandom(tokenId.toString());
      const transaction = await this.imxModel.create({ tokenId: Number(tokenId), user: walletAddress, inWallet: isUserExist != null });
      return { ...transaction, metadata };

    } catch (error) {
      throw new HttpException(
        `mint token error ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async transferToken(tokenId:number, receiver: string): Promise<any> {
    try {

      return this.admin.transfer({
        sender: this.admin.address,
        token: {
          type:ERC721TokenType.ERC721,
          data: { tokenId: tokenId.toString(), tokenAddress: process.env.TOKEN_ADDRESS}
        },
        quantity: BigNumber.from("1"),
        receiver
      })

    } catch (error) {
      throw new HttpException(`transfer token error ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(filter: any): Promise<any> {
    return await this.imxModel.findOne(filter);
  }

  async setInWallet(_id, inWallet:boolean): Promise<any> {
    return await this.imxModel.updateOne({ _id }, { $set: { inWallet  } })
  }

  async getImxUser(walletAddress: string): Promise<any> {
    try {
      return await this.admin.getUser({ user: walletAddress });
    } catch {
      return;
    }
  }
}
