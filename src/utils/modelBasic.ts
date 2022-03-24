export interface ModelBasic<T>{
    fromDTO(t: T): any;
    toDTO(t: T): any;

}
