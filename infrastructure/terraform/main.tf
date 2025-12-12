# Insecure Terraform Configuration for RepoShield Testing

resource "aws_s3_bucket" "public_data" {
  bucket = "my-public-bucket-vulnerable"
  acl    = "public-read"
  
  versioning {
    enabled = false
  }
}

resource "aws_s3_bucket_public_access_block" "public" {
  bucket = aws_s3_bucket.public_data.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_security_group" "wide_open" {
  name        = "wide_open_sg"
  description = "Insecure security group - allows all traffic"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "main" {
  identifier           = "vulnerable-db"
  engine               = "mysql"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  publicly_accessible  = true
  storage_encrypted    = false
  skip_final_snapshot  = true
  
  username = "admin"
  password = "password123"
}

resource "aws_iam_user" "admin" {
  name = "super_admin"
}

resource "aws_iam_user_policy" "admin_policy" {
  name = "full_access"
  user = aws_iam_user.admin.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "*"
        Resource = "*"
      }
    ]
  })
}

resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
  
  # Missing: encryption, monitoring, IMDSv2
  metadata_options {
    http_tokens = "optional"
  }
}
