use crate::errors::ServiceError;
use alcoholic_jwt::{token_kid, validate, Validation, JWKS};
use serde::{Deserialize, Serialize};
use std::error::Error;

pub fn validate_token(token: &str) -> Result<bool, ServiceError> {
    todo!()
}
