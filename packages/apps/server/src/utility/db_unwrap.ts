import { RowDataPacket } from 'mysql2'

function db_unwrap<T = RowDataPacket>(result: any): T[] {
  return result[0] as T[]
}

function db_first<T = any>(result: any): T {
  return result[0][0] as T
}

function db_col<T = any>(col: string): (result: any) => T {
  return (result: any): T => {
    return result[0][0][col] as T
  }
}

function db_col_all<T = any>(col: string): (result: any) => T[] {
  return (result: any): T[] => {
    return result[0].map((x: any) => x[col] as T)
  }
}

export { db_unwrap, db_first, db_col, db_col_all }
