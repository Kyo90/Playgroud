import {IListRenderer} from './list'
import {ISpliceable} from '../../../common/sequence'
import {IDisposable} from '../../../common/lifecycle'

interface ITraitChangeEvent {
	indexes: number[];
	browserEvent?: UIEvent;
}

type ITraitTemplateData = HTMLElement;

interface IRenderedContainer {
	templateData: ITraitTemplateData;
	index: number;
}

class TraitRenderer<T> implements IListRenderer<T, ITraitTemplateData> {

  private renderedElements: IRenderedContainer[] = [];
  constructor(private trait: Trait<T>) { }
  get templateId(): string {
		return `template:${this.trait.trait}`;
	}
}

class Trait<T> implements ISpliceable<boolean>, IDisposable {

  get trait(): string { return this._trait; }

  constructor(private _trait: string) { }

  public splice(start: number, deleteCount: number, elements: boolean[]): void  {

  } 
  public dispose():void {

  }
}

function isInputElement(e: HTMLElement): boolean {
	return e.tagName === 'INPUT' || e.tagName === 'TEXTAREA';
}

export class List<T> implements ISpliceable<T>, IDisposable{
  
  splice(start: number, deleteCount: number, elements: T[] = []): void {

  }

  dispose(): void {
    
  }
}
