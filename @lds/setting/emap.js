module.exports = {

    passDeclineCodes: [
        
        'transaction_not_allowed',
        'do_not_honor',
        'incorrect_zip',
        'insufficient_funds',
        'card_velocity_exceeded',
        'account_country_invalid_address',
        'amount_too_small',
        'invalid_amount',
        'balance_insufficient',
        'email_invalid',
        'incorrect_address',
        'postal_code_invalid'
    ],


    maybeDeclineCodes: [
        
        'currency_not_supported',
        'offline_pin_required',
        'online_or_offline_pin_required',
        'security_violation',
        'revocation_of_authorization',
        'approve_with_id',
        'authentication_required',
        'amount_too_small',
        'withdrawal_count_limit_exceeded',
        'amount_too_large',
        'generic_decline'
    ],

    escapeErrorCodes: [
        
        'invalid_request_error',
        'invalid_charge_amount',
        'country_unsupported',
        'country_code_invalid',
        'duplicate_transaction',
        'try_again_later',
        'api_key_expired',
        'charge_already_captured',
        'charge_exceeds_source_limit',
        'idempotency_key_in_use',
        'invalid_source_usage',
        'livemode_mismatch',
        'order_creation_failed',
        'parameter_invalid_empty',
        'parameter_invalid_integer',
        'parameter_invalid_string_blank',
        'parameter_missing',
        'parameter_unknown',
        'parameters_exclusive',
        'platform_api_key_expired',
        'processing_error',
        'rate_limit',
        'resource_missing',
        'sensitive_data_access_expired',
        'testmode_charges_only',
        'tls_version_unsupported',
        'token_already_used',
        'token_in_use',
        'url_invalid',
        'lock_timeout',
        'secret_key_required'
    ],

    escapeErrorNumCodes: [ 500, 503 ]
}