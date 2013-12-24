GeneralAssessmently::Application.routes.draw do
  root 'app#index'
  resources :assessments
end
