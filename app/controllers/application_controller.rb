class ApplicationController < ActionController::API

  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
  
  def require_admin
    unless current_user&.admin?
      render json: { errors: "You do not have permission to perform this action." }, status: :unauthorized
    end
  end

  private

  def unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def record_not_found(error)
    render json: { errors: "Not Found" }, status: :not_found
  end
end
