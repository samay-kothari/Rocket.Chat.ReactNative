import Model from '@nozbe/watermelondb/Model';
import Relation from '@nozbe/watermelondb/Relation';

import { ILastMessage, TMessageModel } from './IMessage';
import { IRocketChatRecord } from './IRocketChatRecord';
import { RoomID } from './IRoom';
import { IServedBy } from './IServedBy';
import { TThreadModel } from './IThread';
import { TThreadMessageModel } from './IThreadMessage';
import { TUploadModel } from './IUpload';
import { IUser } from './IUser';

export enum SubscriptionType {
	GROUP = 'p',
	DIRECT = 'd',
	CHANNEL = 'c',
	OMNICHANNEL = 'l',
	E2E = 'e2e',
	THREAD = 'thread' // FIXME: this is not a type of subscription
}

export interface IVisitor {
	_id?: string;
	username?: string;
	token?: string;
	status?: string;
	lastMessageTs?: Date;
}

export enum ERoomTypes {
	DIRECT = 'direct',
	GROUP = 'group',
	CHANNEL = 'channel'
}

export interface ISubscription {
	_id: string; // _id belongs watermelonDB
	id: string; // id from server
	_updatedAt?: string; // from server
	v?: IVisitor;
	f: boolean;
	t: SubscriptionType;
	ts: string | Date;
	ls: Date;
	name: string;
	fname?: string;
	rid: string; // the same as id
	open: boolean;
	alert: boolean;
	roles?: string[];
	unread: number;
	lm: string;
	lr: string;
	userMentions: number;
	groupMentions: number;
	tunread: string[];
	tunreadUser?: string[];
	tunreadGroup?: string[];
	roomUpdatedAt: Date | number;
	ro: boolean;
	lastOpen?: Date;
	description?: string;
	announcement?: string;
	bannerClosed?: boolean;
	topic?: string;
	blocked?: boolean;
	blocker?: boolean;
	reactWhenReadOnly?: boolean;
	archived: boolean;
	joinCodeRequired?: boolean;
	muted?: string[];
	ignored?: string[];
	broadcast?: boolean;
	prid?: string;
	draftMessage?: string | null;
	lastThreadSync?: Date;
	jitsiTimeout?: Date;
	autoTranslate?: boolean;
	autoTranslateLanguage: string;
	lastMessage?: ILastMessage;
	hideUnreadStatus?: boolean;
	sysMes?: string[] | boolean;
	uids?: string[];
	usernames?: string[];
	visitor?: IVisitor;
	departmentId?: string;
	servedBy?: IServedBy;
	livechatData?: any;
	tags?: string[];
	E2EKey?: string;
	encrypted?: boolean;
	e2eKeyId?: string;
	avatarETag?: string;
	teamId?: string;
	teamMain?: boolean;
	separator?: boolean;
	// https://nozbe.github.io/WatermelonDB/Relation.html#relation-api
	messages: Relation<TMessageModel>;
	threads: Relation<TThreadModel>;
	threadMessages: Relation<TThreadMessageModel>;
	uploads: Relation<TUploadModel>;
}

export type TSubscriptionModel = ISubscription & Model;

type ServerRoomType = 'c' | 'd' | 'p' | 'l';

// https://github.com/RocketChat/Rocket.Chat/blob/a88a96fcadd925b678ff27ada37075e029f78b5e/definition/ISubscription.ts#L8
export interface IServerSubscription extends IRocketChatRecord {
	u: Pick<IUser, '_id' | 'username' | 'name'>;
	v?: Pick<IUser, '_id' | 'username' | 'name'>;
	rid: RoomID;
	open: boolean;
	ts: Date;

	name: string;

	alert?: boolean;
	unread: number;
	t: ServerRoomType;
	ls: Date;
	f?: true;
	lr: Date;
	hideUnreadStatus?: true;
	teamMain?: boolean;
	teamId?: string;

	userMentions: number;
	groupMentions: number;

	tunread?: Array<string>;
	tunreadGroup?: Array<string>;
	tunreadUser?: Array<string>;

	prid?: RoomID;

	roles?: string[];

	onHold?: boolean;
	encrypted?: boolean;
	E2EKey?: string;
	unreadAlert?: 'default' | 'all' | 'mentions' | 'nothing';

	fname?: unknown;

	code?: unknown;
	archived?: unknown;
	audioNotificationValue?: unknown;
	desktopNotifications?: unknown;
	mobilePushNotifications?: unknown;
	emailNotifications?: unknown;
	blocked?: unknown;
	blocker?: unknown;
	autoTranslate?: unknown;
	autoTranslateLanguage?: unknown;
	disableNotifications?: unknown;
	muteGroupMentions?: unknown;
	ignored?: unknown;

	department?: unknown;
}
