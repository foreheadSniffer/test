// "Константа" настроек.
import {Injectable} from '@angular/core';

@Injectable()

export class AppSettings {
	public static get agami (): string {
		return '//s-agami.vedomosti.ru';
	}
	public static get snipe(): string {
		return '//s-snipe.vedomosti.ru/v1';
	}
}
