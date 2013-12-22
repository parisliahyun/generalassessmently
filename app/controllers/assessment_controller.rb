class AssessmentsController < ApplicationController
  before_action :set_assessment, only: [:show, :edit, :update, :destroy]

  # GET /assessments.json
  def index
    @assessments = Assessment.all
    render json: @assessments
  end

  # GET /assessments/1.json
  def show
  end

  # POST /assessments.json
  def create
    @assessment = Assessment.new(assessment_params)

    if @assessment.save
      render json: @assessment
    else
      render json: @assessment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /assessments/1.json
  def update
    if @assessment.update(assessment_params)
      head :no_content
    else
      render json: @assessment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /assessments/1.json
  def destroy
    @assessment.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_assessment
      @assessment = Assessment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def assessment_params
      params.require(:assessment).permit(:url, :done)
    end
end