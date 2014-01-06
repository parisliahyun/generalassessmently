class AddCourseidToSpreadsheets < ActiveRecord::Migration
  def change
      change_table :spreadsheets do |t|
      t.integer :course_id
    end
  end
end
