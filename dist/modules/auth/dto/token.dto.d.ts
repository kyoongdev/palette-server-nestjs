export interface TokenDTOProps {
    accessToken: string;
    refreshToken: string;
}
export declare class TokenDTO {
    accessToken: string;
    refreshToken: string;
    constructor(props: TokenDTOProps);
}
