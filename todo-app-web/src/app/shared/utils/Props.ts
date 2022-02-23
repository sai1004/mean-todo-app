export class Props {
    static API_END_POINT: any;
    static PY_END_POINT: any;
    static TIME_OUT = 1000;
    static MAX_WIDTH = '1400px';
    static EMAIL_PATTERN: any = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
    static PASSWORD_PATTERN: any = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
    static ALL_PATTERN: string = '(.*?)';
    static DATA_PATTERN: string = '[\\w\\d\\s.,&@:;!#-=]*';
    static DECIMAL_PATTERN: string = '(\\d+(\\.\\d{1,2})?)';
    static NUMBER_PATTERN: string = '[0-9]*';
    static PHONE_PATTERN: string = '[6-9]{1}[0-9]{9}$';
    static AADHAR_PATTERN: string = '^[0-9]{12}$';
    static ZIPCODE_PATTERN: string = '^[5][0-9]{5}$';
    //static DATE_PATTERN: string = '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(T?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))';
    static DATE_PATTERN: string = '[\\w\\d\\s.,&@:;!#-=]*';
    static APLPHA_NUMERIC_PATTERN: string = '^[a-zA-Z0-9_]*$';
    static APLPHA_NUMERICS_PATTERN: string = '^[a-zA-Z0-9]*$';
    static ALPHABETICAL_PATTERN: string = '^[a-zA-Z]*$';
    static ALPHABETICALS_PATTERN: string = '^[a-zA-Z ]*$';
    static LOCATION_PATTERN: string = '[a-zA-Z0-9 ]*$';
    static APLPHA_PATTERN: string = '[a-zA-Z ]*$';
    static AMT_PATTERN: string = '^[0-9]*$';
    static DISCOUNT_PATTERN: string = '^\\d{0,2}(\\.\\d{1,2})?$';
    static ALPHA_SPACE: string = '.*\\S.*[a-zA-z]';
    static REST_TYPE_GET: string = 'GET';
    static REST_TYPE_POST: string = 'POST';
    static REST_TYPE_PUT: string = 'PUT';
    static REST_TYPE_DELETE: string = 'DELETE';

    public static PLEASE_LOGIN: string = 'Please login.';
    public static CONFIRM_MESSAGE: string = 'Do you want to proceed?';
    public static PROFILE_STATUS_ACTIVE: string = 'Do you want to Deactivate this Account';
    public static CURRENCY = '$ ';
    public static PERCENTAGE = '% ';
    public static MESSAGE: string = 'YOUR PROFILE IS NOT VERIFIED';
    public static PROFILE_STATUS_VERIFIED: string = 'VERIFIED';
}
