import { IconType } from "react-icons";

export type ApplicationDefinition = {
    /** Application ID for reference */
    readonly appId: string;
    /** Title/name to be shown to user */
    readonly displayName: string;
    /** An associated icon as URL */
    readonly icon?: IconType;
    /** The source of content - URL as string for remote or local content */
    readonly sourceUrl?: string;

    readonly sourceContent?: any;
    /** Dimensions where 
     * - [0] = w 
     * - [1] = h 
     */
    dimensions?: [number | string, number | string];
}

export type ActiveApplication = {
    /** Application ID for reference */
    readonly appId: ApplicationDefinition['appId'];
    /** any chanes the user might have made */
    // userChanges: any;
    /** Dimensions where 
     * - [0] = x 
     * - [1] = y 
     */
    positions: [number , number ];
    /** Dimensions where 
     * - [0] = w 
     * - [1] = h 
     */
    dimensions: [number | string, number | string];
    /** Application is minized or not */
    _isVisible: boolean;
}

/*

Dr george sharmone
- 484 476 1000

Dr Brian DeSouza
- 610 649 6090

*/
