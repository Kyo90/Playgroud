
import {LinkedList} from './LinkedList';
import {IDisposable, DisposableStore} from './lifecycle';
export interface Event<T> {
  (listener: (e:T) => any, thisArgs?: any, disposable?: IDisposable[] | DisposableStore): IDisposable;
}

type Listener<T> = [(e: T) => void, any] | ((e: T) => void);

export class Emitter<T> {
  private _disposed: boolean = false;
  private _event?: Event<T>;

  protected _listeners?: LinkedList<Listener<T>>;

  get event(): Event<T> {
    if (!this._event) {
      this._event =  (listener: (e: T) => any, thisArgs?: any, disposables?: IDisposable[] | DisposableStore) => {
				if (!this._listeners) {
					this._listeners = new LinkedList();
        }
        let result: IDisposable;
        result = {
          dispose: () => {}
        }
        return result;
      }  
    }
    return this._event;
  }

  dispose() {

  }
}
